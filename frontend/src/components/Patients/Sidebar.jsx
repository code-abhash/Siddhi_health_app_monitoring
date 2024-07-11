import React from 'react';
import { FaRibbon, FaWeight, FaRulerVertical, FaTransgender } from 'react-icons/fa';
import { MdCatchingPokemon } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisease } from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from '../Axios/Axios';

const Sidebar = ({patientId}) => {
  // State to store patient data and recent record
  const [patientData, setPatientData] = useState(null);
  const [recentRecord, setRecentRecord] = useState(null);

  // Effect hook to fetch patient data and recent record when patientId changes
  useEffect(() => {
    if (patientId) {
      AxiosInstance.get(`patientinfo/${patientId}/`)
        .then(response => {
          setPatientData(response.data.patientData); // Set patient data from API response
          setRecentRecord(response.data.recentRecord); // Set recent record from API response
        })
        .catch(error => {
          console.error('Error fetching patient info:', error); // Log error if fetching fails
        });
    }
  }, [patientId]);

  // Render sidebar with placeholders if patient data is not yet fetched
  if (!patientData) {
    return (
      <aside className="shadow-2xl font-roboto  bg-gray-50 rounded-lg p-6 flex flex-col gap-6">
        {/* Placeholder elements for patient information */}
        <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
          <MdCatchingPokemon className="text-yellow-500" />
          <p className="text-lg font-normal">Age:</p>
        </div>
        <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
          <FaRulerVertical className="text-blue-500" />
          <p className="text-lg font-normal">Height:</p>
        </div>
        <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
          <FaWeight className="text-purple-500" />
          <p className="text-lg font-normal">B-Group:</p>
        </div>
        <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
          <FaTransgender className="text-pink-900" />
          <p className="text-lg font-normal">Sex:</p>
        </div>
      </aside>
    );
  }

  // Render sidebar with patient data once fetched
  return (
    <aside className="shadow-2xl font-roboto bg-gray-50 rounded-lg p-6 flex flex-col gap-6">
      {/* Display patient information */}
      <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
        <MdCatchingPokemon className="text-yellow-500" />
        <p className="text-lg font-normal">Age: {patientData.patientAge}</p>
      </div>
      <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
        <FaRulerVertical className="text-blue-500" />
        <p className="text-lg font-normal">Height: {patientData.patientHeight}</p>
      </div>
      <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
        <FaWeight className="text-purple-500" />
        <p className="text-lg font-normal">B-Group: {patientData.patientBloodGroup}</p>
      </div>
      <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
        <FaTransgender className="text-pink-900" />
        <p className="text-lg font-normal">Sex: {patientData.patientSex}</p>
      </div>
    </aside>
  );
};

export default Sidebar;