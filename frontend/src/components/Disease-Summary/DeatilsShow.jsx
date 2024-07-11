import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AxiosInstance from '../Axios/Axios';

const DetailsShow = ({ patientId }) => {
  // State to store patient details
  const [patientDetails, setPatientDetails] = useState({
    description: "",
    treatment: "",
    diagnosis: "",
    symptoms: ""
  });

  // Fetch patient details when component mounts or patientId changes
  useEffect(() => {
    AxiosInstance.get(`patient_description/${patientId}/`)
      .then(response => {
        setPatientDetails(response.data); // Assuming the response is an object with properties for each type
      })
      .catch(error => {
        console.error("Error fetching patient details:", error);
      });
  }, [patientId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Patient Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Description section */}
        <div className='border-hidden shadow-lg rounded-lg'>
          <h3 className="text-md font-bold text-gray-700 mb-4 ml-2">Description:</h3>
          <textarea
            className="border rounded-lg w-11/12 p-2 shadow-md ml-2"
            value={patientDetails.description}
            readOnly
          />
        </div>
        {/* Treatment section */}
        <div className='border-hidden shadow-lg rounded-lg'>
          <h3 className="text-md font-bold text-gray-700 mb-4 ml-2">Treatment:</h3>
          <textarea
            className="border rounded-lg w-11/12 p-2 shadow-md ml-2"
            value={patientDetails.treatment}
            readOnly
          />
        </div>
        {/* Diagnosis section */}
        <div className='border-hidden shadow-lg rounded-lg'>
          <h3 className="text-md font-bold text-gray-700 mb-4 ml-2">Diagnosis:</h3>
          <textarea
            className="border rounded-lg w-11/12 p-2 shadow-md ml-2"
            value={patientDetails.diagnosis}
            readOnly
          />
        </div>
        {/* Symptoms section */}
        <div className='border-hidden shadow-lg rounded-lg'>
          <h3 className="text-md font-bold text-gray-700 mb-4 ml-2">Symptoms:</h3>
          <textarea
            className="border rounded-lg w-11/12 p-2 shadow-md ml-2"
            value={patientDetails.symptoms}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsShow;