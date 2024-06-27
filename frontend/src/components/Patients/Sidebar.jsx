

import React from 'react';
import { FaUserMd, FaWeight, FaRulerVertical, FaTransgender } from 'react-icons/fa';
import { MdCatchingPokemon } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDisease } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({patientId}) => {
  const [patientData, setPatientData] = useState(null);
  const [recentRecord, setRecentRecord] = useState(null);

  useEffect(() => {
    if (patientId) {
      axios.get(`http://127.0.0.1:8000/api/patientinfo/${patientId}/`)
        .then(response => {
          setPatientData(response.data.patientData);
          setRecentRecord(response.data.recentRecord);
        })
        .catch(error => {
          console.error('Error fetching patient info:', error);
        });
    }
  }, [patientId]);

  if (!patientData) {
return (
  <aside className="shadow-xl font-roboto bg-gradient-to-b from-gray-50 to-blue-100 rounded-lg p-6 flex flex-col gap-6">
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
      <FaTransgender className="text-red-500" />
      <p className="text-lg font-normal">Sex:</p>
    </div>
    <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
    <FontAwesomeIcon icon={faDisease} />
      <p className="text-lg font-normal">Disease:</p>
    </div>
  </aside>
);
}

return (
<aside className="shadow-xl font-roboto bg-gradient-to-b from-gray-50 to-blue-100 rounded-lg p-6 flex flex-col gap-6">
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
    <FaTransgender className="text-red-500" />
    <p className="text-lg font-normal">Sex: {patientData.patientSex}</p>
  </div>
  <div className="flex items-center gap-2 hover:bg-green-100 p-2 rounded-md">
  <FontAwesomeIcon icon={faDisease} />
    <p className="text-lg font-normal">Disease: {patientData.disease}</p>
  </div>
</aside>
);
};

export default Sidebar;