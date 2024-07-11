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
import AxiosInstance from "../Axios/Axios";

const Disease_summary = () => {
  const { patientId } = useParams(); // Extract patientId from URL parameters
  const [patientDetails, setPatientDetails] = useState(null); // State to store patient details
  const [recentRecord, setRecentRecord] = useState({}); // State to store recent vitals record

  // Fetch patient details and recent record when patientId changes
  useEffect(() => {
    if (patientId) {
      AxiosInstance
        .get(`patientinfo/${patientId}/`)
        .then((response) => {
          setPatientDetails(response.data.patientData); // Set patient details
          setRecentRecord(response.data.recentRecord || {}); // Set recent record or an empty object
        })
        .catch((error) => {
          console.error("Error fetching patient info:", error);
        });
    }
  }, [patientId]);

  // Display loading message if patient details are not yet fetched
  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-lg mt-2 font-bold text-gray-900 text-center mb-4">
        Disease Summary for Patient ID: {patientDetails.patientId}
      </h2>
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg flex justify-between">
        {recentRecord === null || Object.keys(recentRecord).length === 0 ? (
          // Display message if no recent vitals are collected
          <div className="font-roboto">
            <p className="text-gray-900">No vitals collected yet..</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => (window.location.href = "/patientvitals")}
            >
              Collect Vitals
            </button>
          </div>
        ) : (
          // Display recent vitals if available
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
        )}
        {/* Display patient details */}
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
      </div>

      {/* Display details and add details components */}
      <DetailsShow patientId={patientId} />
      <AddDetails patientId={patientId} />
    </>
  );
};

export default Disease_summary;