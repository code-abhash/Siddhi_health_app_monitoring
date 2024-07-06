import React, { useState, useEffect } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Panel = ({ onPatientSelect }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown open/close
  const [patients, setPatients] = useState([]); // State to store all patients fetched from API
  const [filteredPatients, setFilteredPatients] = useState([]); // State to store filtered patients based on search
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store the currently selected patient
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term entered by user

  // Fetch patients from API on component mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/patientdrop/")
      .then((response) => {
        // Filter unique patients based on patientId
        const uniquePatients = filterUniquePatients(response.data);
        // Sort patients alphabetically by patientId
        uniquePatients.sort((a, b) => a.patientId.localeCompare(b.patientId));
        setPatients(uniquePatients); // Set both patients and filteredPatients initially
        setFilteredPatients(uniquePatients);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  // Function to filter out duplicate patients based on patientId
  const filterUniquePatients = (patients) => {
    const uniqueIds = new Set(); // Use Set to track unique patientIds
    return patients.filter((patient) => {
      if (uniqueIds.has(patient.patientId)) {
        return false; // Skip if patientId already exists
      } else {
        uniqueIds.add(patient.patientId); // Add patientId to Set if it doesn't exist
        return true;
      }
    });
  };

  // Handle patient selection
  const handleSelect = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    setIsOpen(false); // Close the dropdown
    onPatientSelect(patient); // Invoke callback with selected patient
  };

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term state
    // Filter patients based on search term (case insensitive)
    const filtered = patients.filter(
      (patient) =>
        patient.patientId
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) || // Match patientId
        patient.patientName.toLowerCase().includes(e.target.value.toLowerCase()) // Match patientName
    );
    setFilteredPatients(filtered); // Update filtered patients
  };

  return (
    <div className="flex font-roboto flex-col sm:flex-row m-2 space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="realtive w-full max-w-xs">
        {/* Dropdown button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex justify-between items-center text-gray-700 hover:bg-gray-100 transition duration-300"
        >
          {selectedPatient
            ? `${selectedPatient.patientId} - ${selectedPatient.patientName}` // Display selected patient info
            : "Select Patient"} {/* Default text if no patient is selected */}
          {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />} {/* Icon to indicate dropdown state */}
        </button>
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10 max-w-xs">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border-b border-gray-200 focus:outline-none"
            />
            {/* List of filtered patients */}
            <div className="max-h-60 overflow-y-auto">
              {filteredPatients.map((patient, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(patient)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300"
                >
                  {patient.patientId} - {patient.patientName} {/* Display patient info */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Panel;