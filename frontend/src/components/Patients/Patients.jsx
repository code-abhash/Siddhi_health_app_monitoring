import React from 'react';
import PatientInfo from './PatientInfo';
import Sidebar from './Sidebar';
import Navbar from '../Home/Navbar';
import Footer from '../Footer';
import Realtime from '../Home/Realtime';
import Infobutton from '../Infobutton/Infobutton';
import Panel from '../Home/Panel';
import { useState } from 'react';
import patientIcon from "./img/patient.png";

const Patients = () => {
  // State to store selected patient ID and name
  const [selectedPatientId, setSelectedPatientId] = useState("PatientId");
  const [selectedPatientName, setSelectedPatientName] = useState("PatientName");

  // Function to handle patient selection
  const handlePatientSelect = (patient) => {
    setSelectedPatientId(patient.patientId);
    setSelectedPatientName(patient.patientName);
    // You can perform additional actions here with the selected patient ID
    //console.log("Selected Patient ID:", patientId);
  };

  return (
    <div className="font-roboto">
      {/* Render the Navbar component */}
      <Navbar />

      {/* Header section */}
      <div className="bg-gray-600 font-roboto p-5 flex justify-between items-center">
        {/* Render the Panel component for patient selection */}
        <Panel onPatientSelect={handlePatientSelect} />

        <div className='flex gap-8'>
          {/* Button for editing patient information */}
          <button className="bg-gray-400 rounded-full p-3">
            <img
              src={patientIcon}
              alt="Edit Patient"
              title="Edit Patient"
              className="object-cover w-10 h-auto border border-transparent rounded-lg"
            />
          </button>

          <div className='flex flex-col'>
            {/* Display selected patient ID and name */}
            <h1 className="text-white text-2xl font-semibold ">{selectedPatientId}</h1>
            <h1 className="text-white text-2xl font-semibold ">{selectedPatientName}</h1>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="flex flex-row justify-between h-3/4 w-full">
        {/* Render the PatientInfo component with selected patient ID */}
        <PatientInfo patientId={selectedPatientId} />
        {/* Render the Sidebar component with selected patient ID */}
        <Sidebar patientId={selectedPatientId} />
      </div>

      {/* Real-time analysis section */}
      <div className="ml-6 mt-4">
        <p className="text-xl font-bold">
          Real-Time Analysis 
          {/* Infobutton component for additional information */}
          <Infobutton message={`This has the real-time graphs showing the vitals vs days line graph.
          -Heart beat
          -blood pressure
          -spo2
          -Temperature`} />
        </p>
        {/* Render the Realtime component with selected patient ID */}
        <Realtime patientId={selectedPatientId} />
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Patients;