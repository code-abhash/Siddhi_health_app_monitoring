import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import AddDetails from "./AddDetails";
import {
  UserIcon,
  BriefcaseIcon,
  ExclamationCircleIcon,
  BuildingOfficeIcon,
  HashtagIcon,
  HeartIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import DetailsShow from "./DeatilsShow";

const Disease_summary = () => {
  const { patientId } = useParams();
  const [patientDetails, setPatientDetails] = useState(null);
  const [recentRecord, setRecentRecord] = useState(null);

  useEffect(() => {
    if (patientId) {
      axios
        .get(`http://127.0.0.1:8000/api/patientinfo/${patientId}/`)
        .then((response) => {
          setPatientDetails(response.data.patientData);
          setRecentRecord(response.data.recentRecord);
        })
        .catch((error) => {
          console.error("Error fetching patient info:", error);
        });
    }
  }, [patientId]);

  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <h2 className="text-lg font-bold text-gray-900 text-center mb-4">
      Disease Summary for Patient ID: {patientDetails.patientId}
    </h2>
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex justify-between">
      {recentRecord && (
        <div className="font-roboto">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Recent Vitals:</h2>
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
      )}
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <ul className="space-y-2">
            <li className="flex items-center">
              <UserIcon className="w-5 h-5 text-indigo-500 mr-2" />
              <strong className="text-gray-700">Patient Name:</strong>
              {patientDetails.patientName}
            </li>
            <li className="flex items-center">
              <BriefcaseIcon className="w-5 h-5 text-teal-500 mr-2" />
              <strong className="text-gray-700">Doctor Name:</strong>
              {patientDetails.doctorName}
            </li>
            <li className="flex items-center">
              <ExclamationCircleIcon className="w-5 h-5 text-pink-500 mr-2" />
              <strong className="text-gray-700">Med Conditions:</strong>
              {patientDetails.medConditions}
            </li>
            <li className="flex items-center">
              <BuildingOfficeIcon className="w-5 h-5 text-orange-500 mr-2" />
              <strong className="text-gray-700">Ward:</strong>
              {patientDetails.ward}
            </li>
            <li className="flex items-center">
              <HashtagIcon className="w-5 h-5 text-purple-500 mr-2" />
              <strong className="text-gray-700">Bed No:</strong>
              {patientDetails.bed}
            </li>
          </ul>
        </div>
      </div>
      {/* Add any additional details you want to display */}
    </div>
   
    <DetailsShow patientId={patientId}/>
    <AddDetails patientId={patientId} />
  </>
  );
};

export default Disease_summary;
