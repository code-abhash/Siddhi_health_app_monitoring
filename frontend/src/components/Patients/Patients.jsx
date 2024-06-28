
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

  const [selectedPatientId, setSelectedPatientId] = useState("PatientId");
  const [selectedPatientName, setSelectedPatientName] = useState("PatientName");

  const handlePatientSelect = (patient) => {
    setSelectedPatientId(patient.patientId);
    setSelectedPatientName(patient.patientName);
    // You can perform additional actions here with the selected patient ID
    //console.log("Selected Patient ID:", patientId);
  };
  return (
    <div className="font-roboto">
    <Navbar />

    {/* Header section */}
    <div className="bg-gray-600 font-roboto p-5 flex justify-between items-center">
      <Panel onPatientSelect={handlePatientSelect} />
      <div className='flex gap-8'>
      <button className="bg-gray-400 rounded-full p-3">
          <img
            src={patientIcon}
            alt="Edit Patient"
            title="Edit Patient"
            className="object-cover w-10 h-auto border border-transparent rounded-lg"
          />
        </button>
        <div className='flex flex-col'>
          
      <h1 className="text-white text-2xl font-semibold ">{selectedPatientId}</h1>
      <h1 className="text-white text-2xl font-semibold ">{selectedPatientName}</h1></div>

        
      </div>
    </div>

    {/* Main content section */}
    <div className="flex flex-row justify-between h-3/4 w-full">
      <PatientInfo patientId={selectedPatientId} />
      <Sidebar patientId={selectedPatientId} />
    </div>

    {/* Real-time analysis section */}
    <div className="ml-6 mt-4">
      <p className="text-xl font-bold">
        Real-Time Analysis 
        <Infobutton message={`This has the real-time graphs showing the vitals vs days line graph.
        -Heart beat
        -blood pressure
        -spo2
        -Temperature`} />
      </p>
      <Realtime patientId={selectedPatientId} />
    </div>

    {/* Footer section */}
    <Footer />
  </div>
);
};

export default Patients;
