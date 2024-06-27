

import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import list from "./List.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Panel = ({ onPatientSelect }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    // Fetch patient data from the Django backend
    axios.get('http://127.0.0.1:8000/api/patientdrop/')
      .then(response => {
        // Filter out duplicate patient IDs
        const uniquePatients = filterUniquePatients(response.data);
        uniquePatients.sort((a, b) => a.patientId.localeCompare(b.patientId));
        setPatients(uniquePatients);
        setFilteredPatients(uniquePatients);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);
  const filterUniquePatients = (patients) => {
    const uniqueIds = new Set();
    return patients.filter(patient => {
      if (uniqueIds.has(patient.patientId)) {
        return false;
      } else {
        uniqueIds.add(patient.patientId);
        return true;
      }
    });
  };

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    setIsOpen(false);
    onPatientSelect(patient);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = patients.filter(patient =>
      patient.patientId.toLowerCase().includes(e.target.value.toLowerCase()) ||
      patient.patientName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  
  

  return (
    <React.Fragment>
      <div className="flex font-roboto flex-col sm:flex-row  m-2 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="font-semibold bg-gray-400 flex items-center justify-between px-6 py-2 text-lg tracking-wider  hover:bg-gray-500 rounded-lg transition duration-300 ease-in-out"
          >
            {selectedPatient ? `${selectedPatient.patientId} - ${selectedPatient.patientName}` : 'PatientId-Name'}
            {!isOpen ? (
              <AiOutlineCaretDown className="ml-2 h-5 w-5" />
            ) : (
              <AiOutlineCaretUp className="ml-2 h-5 w-5" />
            )}
          </button>
          
          {isOpen && (
            <div className=" absolute  bg-gray-400 text-gray-900 mt-12 py-2  rounded-lg shadow-lg z-10">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 mb-2 bg-gray-200 text-white "
              />

              {filteredPatients.map((patient, i) => (
                <div
                  key={i}
                  className="px-6 py-1 hover:bg-gray-500 hover:cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => handleSelect(patient)}
                >
                  {patient.patientId} - {patient.patientName}
                </div>
              ))}
            </div>
          )}
         
        </div></div>
    </React.Fragment>
  );
};

export default Panel;
