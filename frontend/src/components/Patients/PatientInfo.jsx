// src/components/PatientInfo.jsx
import React from 'react';
import { useState ,useEffect} from 'react';
import axios from 'axios';

const PatientInfo = ({patientId}) => {
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
      <div className="font-roboto flex flex-col gap-6 p-6">
        <h2 className="text-lg font-semibold">MedCondition:</h2>
        <h2 className="text-lg font-semibold">Ward: </h2>
        <h2 className="text-lg font-semibold">Recent Vitals: </h2>
        <ul>
          <li>Heart Rate: </li>
          <li>Diastolic BP: </li>
          <li>Systolic BP: </li>
          <li>Body Temp: </li>
          <li>SpO<sub>2</sub> Value: </li>
        </ul>
        <h2 className="text-lg font-semibold">Medication: </h2>
      </div>
    );
  }

  return (
    <div className="font-roboto flex flex-col gap-6 p-6">
      <h2 className="text-lg font-semibold">Condition: {patientData.medConditions}</h2>
      <h2 className="text-lg font-semibold">Ward: {patientData.ward}</h2>
      <h2 className="text-lg font-semibold">Recent Vitals: </h2>
      <ul className="list-disc list-inside">
        <li>Heart Rate(bpm): {recentRecord.heartRate}</li>
        <li>Diastolic BP(mmHg): {recentRecord.diastolicBP}</li>
        <li>Systolic BP(mmHg): {recentRecord.systolicBP}</li>
        <li>Body Temp(°F): {recentRecord.bodyTemp}</li>
        <li>SpO<sub>2</sub>(%) Value: {recentRecord.spo2Value}</li>
      </ul>
      <h2 className="text-lg font-semibold">Medication: {patientData.medication}</h2>
    </div>
  );
};

export default PatientInfo;