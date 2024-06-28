
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Deails_page from './Deails_page';

const Disease_summary = () => {
  const { patientId } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const [patientVitals, setPatientVitals] = useState(null);

  useEffect(() => {
    if (patientId) {
      axios.get(`http://127.0.0.1:8000/api/patientinfo/${patientId}/`)
        .then(response => {
          setPatientDetails(response.data.patientData);
          setPatientVitals(response.data.recentRecord);
        })
        .catch(error => {
          console.error('Error fetching patient info:', error);
        });
    }
  }, [patientId]);

  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (<>
    <div className="bg-white p-8 rounded-lg shadow-lg flex justify-between">
        <div>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Disease Summary for Patient ID: {patientDetails.patientId}</h2>
      <p><strong>Patient Name:</strong> {patientDetails.patientName}</p>
      <p><strong>Doctor Name:</strong> {patientDetails.doctorName}</p>
      <p><strong>MedConditions:</strong> {patientDetails.medConditions}</p>
      <p><strong>Ward:</strong> {patientDetails.ward}</p>
      <p><strong>Bed No:</strong> {patientDetails.bed}</p>
      </div>
      {/* Add any additional details you want to display */}

      {patientVitals && (
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Recent Vitals:</h2>
          <p><strong>Heart Rate:</strong> {patientVitals.heartRate}</p>
          <p><strong>Diastolic BP:</strong> {patientVitals.diastolicBP}</p>
          <p><strong>Systolic BP:</strong> {patientVitals.systolicBP}</p>
          <p><strong>Body Temperature:</strong> {patientVitals.bodyTemp}</p>
          <p><strong>SpO<sub>2</sub>:</strong> {patientVitals.spo2Value}</p>
          <p><strong>Respiratory Rate:</strong> {patientVitals.respRate}</p>
        </div>
      )}
    </div>
    <Deails_page patientId={patientId}/>
    
</>
  );
}

export default Disease_summary;
