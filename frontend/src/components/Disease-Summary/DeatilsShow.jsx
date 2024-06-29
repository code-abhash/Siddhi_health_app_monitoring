import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetailsShow = ({ patientId }) => {
  const [patientDetails, setPatientDetails] = useState({
    description: "",
    treatment: "",
    diagnosis: "",
    symptoms: ""
  });

  useEffect(() => {
    // Fetch patient details from the backend
    axios.get(`http://127.0.0.1:8000/api/patient_description/${patientId}/`)
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
        <div className='border-hidden shadow-lg rounded-lg'>
          <h3 className="text-md font-bold text-gray-700 mb-4 ml-2">Description:</h3>
          <textarea
            className="border rounded-lg w-11/12 p-2 shadow-md ml-2"
            value={patientDetails.description}
            readOnly
          />
        </div>
        <div className='border-hidden shadow-lg rounded-lg'>
          <h3 className="text-md font-bold text-gray-700 mb-4 ml-2">Treatment:</h3>
          <textarea
            className="border rounded-lg w-11/12 p-2 shadow-md ml-2"
            value={patientDetails.treatment}
            readOnly
          />
        </div>
        <div className='border-hidden shadow-lg rounded-lg'>
          <h3 className="text-md font-bold text-gray-700 mb-4 ml-2">Diagnosis:</h3>
          <textarea
            className="border rounded-lg w-11/12 p-2 shadow-md ml-2"
            value={patientDetails.diagnosis}
            readOnly
          />
        </div>
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
