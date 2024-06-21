// src/App.jsx
// import React from 'react';
// import Header from './Header';
// import PatientInfo from './PatientInfo';
// import Sidebar from './Sidebar';
// import Navbar from '../Home/Navbar';
// import Footer from '../Footer';
// import Realtime from '../Home/Realtime';
// import Infobutton from '../Infobutton/Infobutton';
// import Panel from '../Home/Panel';
// import { useState } from 'react';

// const Patients = () => {
//   const [selectedPatientId, setSelectedPatientId] = useState("PatientId");
  

//   const handlePatientSelect = (patient) => {
//     setSelectedPatientId(patient.patientId);
//     // You can perform additional actions here with the selected patient ID
//     //console.log("Selected Patient ID:", patientId);
//   };

//   return (
//     <div className='flex flex-col'>
//         <Navbar/>
//         <Panel
//         onPatientSelect={handlePatientSelect}
//         setPatientId={setSelectedPatientId}
//         setPatientName={setSelectedPatientName}
//         setDoctorName={setSelectedDoctorName}
//       />
//         <Header patientId={selectedPatientId} />
//       <div className="flex flex-row justify-between h-3/4 w-full bg-gray-50">
//         <PatientInfo />
//         <Sidebar />
//       </div>
//       <div><p className="text-xl font-bold ml-6 mt-4 ">Real-Time Analysis <Infobutton message={`This has the real time graphs showing the vitals vs days line graph.
//           -Heart beat
//           -blood pressure
//           -spo2
//           -Temperature`}/></p>
//         <Realtime/>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Patients;
// src/App.jsx
import React from 'react';
import Header from './Header';
import PatientInfo from './PatientInfo';
import Sidebar from './Sidebar';
import Navbar from '../Home/Navbar';
import Footer from '../Footer';
import Realtime from '../Home/Realtime';
import Infobutton from '../Infobutton/Infobutton';
import Panel from '../Home/Panel';
import { useState } from 'react';

const Patients = () => {

  const [selectedPatientId, setSelectedPatientId] = useState("PatientId");

  const handlePatientSelect = (patient) => {
    setSelectedPatientId(patient.patientId);
    // You can perform additional actions here with the selected patient ID
    //console.log("Selected Patient ID:", patientId);
  };
  return (
    <div className="font-roboto">
    <Navbar />
    <Panel onPatientSelect={handlePatientSelect} />
    <Header patientId={selectedPatientId} />
    <div className="flex flex-row justify-between h-3/4 w-full">
      <PatientInfo patientId={selectedPatientId} />
      <Sidebar patientId={selectedPatientId} />
    </div>
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
    <Footer />
  </div>
);
};

export default Patients;
