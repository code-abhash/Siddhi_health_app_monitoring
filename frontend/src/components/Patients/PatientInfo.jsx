import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  HeartIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";

const PatientInfo = ({ patientId }) => {
  const [patientData, setPatientData] = useState(null);
  const [recentRecord, setRecentRecord] = useState(null);

  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://127.0.0.1:8000/api/patientinfo/${patientId}/`)
        .then((response) => {
          setPatientData(response.data.patientData);
          setRecentRecord(response.data.recentRecord);
        })
        .catch((error) => {
          console.error("Error fetching patient info:", error);
        });
    }
  }, [patientId]);

  if (!patientData) {
    return (
      <div className="font-roboto flex flex-col gap-6 p-6">
        <h2 className="text-lg font-bold">MedCondition:</h2>
        <h2 className="text-lg font-bold">Ward: </h2>
        <h2 className="text-lg font-bold">Recent Vitals: </h2>
        <div className="font-roboto">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Recent Vitals:
          </h2>

          <ul className="list-disc list-inside">
            <li className="flex items-center">
              <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
              <strong>Heart Rate:</strong>
            </li>
            <li className="flex items-center">
              <ChartBarIcon className="w-5 h-5 text-blue-500 mr-2" />
              <strong>Diastolic BP:</strong>
            </li>
            <li className="flex items-center">
              <ChartBarIcon className="w-5 h-5 text-blue-500 mr-2" />
              <strong>Systolic BP:</strong>
            </li>
            <li className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
              <strong>Body Temperature:</strong>
            </li>
            <li className="flex items-center">
              <FingerPrintIcon className="w-5 h-5 text-green-500 mr-2" />
              <strong>
                SpO<sub>2</sub>:
              </strong>{" "}
            </li>
            <li className="flex items-center">
              <LifebuoyIcon className="w-5 h-5 text-purple-500 mr-2" />
              <strong>Respiratory Rate:</strong>
            </li>
          </ul>
        </div>
        <h2 className="text-lg font-bold">Medication: </h2>
      </div>
    );
  }

  return (
    <div className="font-roboto flex flex-col gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Condition: {patientData.medConditions}
      </h2>
      <h2 className="text-lg font-semibold">Ward: {patientData.ward}</h2>
      {recentRecord ? (
        <div className="font-roboto">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Recent Vitals:
          </h2>
          <span className="text-medium">
            Collected latestly on {recentRecord.appointmentDate}
          </span>
          <ul className="list-disc list-inside">
            <li className="flex items-center">
              <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
              <strong>Heart Rate:</strong> {recentRecord.heartRate}
            </li>
            <li className="flex items-center">
              <ChartBarIcon className="w-5 h-5 text-blue-500 mr-2" />
              <strong>Diastolic BP:</strong> {recentRecord.diastolicBP}
            </li>
            <li className="flex items-center">
              <ChartBarIcon className="w-5 h-5 text-blue-500 mr-2" />
              <strong>Systolic BP:</strong> {recentRecord.systolicBP}
            </li>
            <li className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-yellow-500 mr-2" />
              <strong>Body Temperature:</strong> {recentRecord.bodyTemp}
            </li>
            <li className="flex items-center">
              <FingerPrintIcon className="w-5 h-5 text-green-500 mr-2" />
              <strong>
                SpO<sub>2</sub>:
              </strong>{" "}
              {recentRecord.spo2Value}
            </li>
            <li className="flex items-center">
              <LifebuoyIcon className="w-5 h-5 text-purple-500 mr-2" />
              <strong>Respiratory Rate:</strong> {recentRecord.respRate}
            </li>
          </ul>
        </div>
      ) : (
        <div className="font-roboto">
          <p className="text-gray-500">No vitals collected yet.</p>
          <a href="/nurse" className="text-blue-500 underline">
            Go to vitals entry page
          </a>
        </div>
      )}
      <h2 className="text-lg font-semibold">
        Medication: {patientData.medication}
      </h2>
    </div>
  );
};

export default PatientInfo;
