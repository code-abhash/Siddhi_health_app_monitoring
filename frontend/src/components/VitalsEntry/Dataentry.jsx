// import React, { useState } from "react";
// import { UserCircleIcon } from "@heroicons/react/24/solid";
// import "./Dataentry.css";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Home/Navbar";
// import HeartRateSlider from "./HeartRateButton";
// import BodyTemperatureSlider from "./BodyTemperatureButton";
// import SPO2Slider from "./SPO2Button";
// import SystolicBPSlider from "./SystolicBPButton";
// import DiastolicBPSlider from "./DiastolicBPButton";
// import Infobutton from "../Infobutton/Infobutton";

// function Dataentry() {
//   const navigate = useNavigate();

//   const [patientId, setPatientId] = useState("");
//   const [patientName, setPatientName] = useState("");
//   const [doctorName, setDoctorName] = useState("");
//   const [bodyTemp, setBodyTemp] = useState(37);
//   const [heartRate, setHeartRate] = useState(60);
//   const [spo2Value, setSpo2Value] = useState(90);
//   const [systolicBP, setSystolicBP] = useState(120);
//   const [diastolicBP, setDiastolicBP] = useState(80);
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");

//   const submitVal = (e) => {
//     e.preventDefault();
//     alert("Data is entered You are being logged out");
//     console.log("Body Temperature:", bodyTemp);
//     console.log("Heart Rate:", heartRate);
//     console.log("SPO2%:", spo2Value);
//     console.log("Systolic BP:", systolicBP);
//     console.log("Diastolic BP:", diastolicBP);
//     console.log("Appointment Date:", appointmentDate);
//     console.log("Appointment Time:", appointmentTime);
//     navigate("/home");
//   };

//   const cancelVal = (e) => {
//     e.preventDefault();
//     alert("Your data won't be saved anymore");
//     navigate("/home");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="fbgimg">
//         <form className="">
//           <div className="space-y-12 mr-2 ml-2">
//             <div className="border-b border-gray-900/10 pb-12">
//               <div className="flex flex-row justify-between">
//                 <h1 className="text-base font-extrabold mt-2 leading-7 text-gray-900">
//                   VITALS ENTRY PAGE
//                 </h1>
//                 <div className="col-span-full">
//                   <div className="mt-2 flex items-center gap-x-3">
//                     <UserCircleIcon
//                       className="h-12 w-12 text-gray-300"
//                       aria-hidden="true"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <p className="text-sm leading-6 text-gray-800">
//                 This Information will be Confidential
//               </p>
//               <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                 {/* Patient ID */}
//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor="username"
//                     className="block font-semibold leading-6 text-gray-900"
//                   >
//                     Patient ID{" "}
//                     <Infobutton
//                       message={`-Enter the id of patient
//                  -ex : 12345678`}
//                     />
//                   </label>
//                   <div className="mt-2">
//                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-900 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                       <input
//                         type="text"
//                         name="username"
//                         id="username"
//                         autoComplete="username"
//                         className="block flex-1 border-0 bg-transparent p-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                         placeholder="Enter Patient ID"
//                         value={patientId}
//                         onChange={(e) => setPatientId(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {/* Patient Name */}
//                 <div className="sm:col-span-3">
//                   <label
//                     htmlFor="first-name"
//                     className="block font-semibold leading-6 text-gray-900"
//                   >
//                     Patient Name
//                     <Infobutton
//                       message={`Enter the name of patient
//                    -ex: Aarav Sharma`}
//                     />
//                   </label>
//                   <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-900 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                     <input
//                       type="text"
//                       name="first-name"
//                       id="first-name"
//                       autoComplete="given-name"
//                       className="block flex-1 border-0 bg-transparent p-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                       placeholder="Enter Patient Name"
//                       value={patientName}
//                       onChange={(e) => setPatientName(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Doctor's Name Input */}
//               <div className="col-span-1  p-4 rounded-xl shadow-lg">
//                 <label
//                   htmlFor="doctor_name"
//                   className="block font-semibold leading-6 text-gray-900"
//                 >
//                   Doctor's Name{" "}
//                   <Infobutton message="Enter the name of doctor under whom the patient is being supervised -ex: Dr. Vivek Patel" />
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="doctor_name"
//                     name="doctor_name"
//                     type="text"
//                     className="ent_clr block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="Enter Doctor's Name"
//                     value={doctorName}
//                     onChange={(e) => setDoctorName(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Date of Entry Input */}
//               <div className="col-span-1 p-4 rounded-xl shadow-lg">
//                 <label
//                   htmlFor="appointment_date"
//                   className="block font-semibold leading-6 text-gray-900"
//                 >
//                   Date of Entry{" "}
//                   <Infobutton message="Enter the Date of entry of vitals signs by selecting in given calendar" />
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="appointment_date"
//                     name="appointment_date"
//                     type="date"
//                     className="ent_clr block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     value={appointmentDate}
//                     onChange={(e) => setAppointmentDate(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Time of Entry Input */}
//               <div className="col-span-1 p-4 rounded-xl shadow-lg">
//                 <label
//                   htmlFor="appointment_time"
//                   className="block font-semibold leading-6 text-gray-900"
//                 >
//                   Time of Entry{" "}
//                   <Infobutton message="Enter the Time of entry of vitals signs" />
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="appointment_time"
//                     name="appointment_time"
//                     type="time"
//                     className="ent_clr block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     value={appointmentTime}
//                     onChange={(e) => setAppointmentTime(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* HeartRateSlider Component */}
//               <div className="col-span-1">
//                 <HeartRateSlider />
//               </div>

//               {/* BodyTemperatureSlider Component */}
//               <div className="col-span-1">
//                 <BodyTemperatureSlider />
//               </div>

//               {/* SPO2Slider Component */}
//               <div className="col-span-1">
//                 <SPO2Slider />
//               </div>

//               {/* SystolicBPSlider Component */}
//               <div className="col-span-1">
//                 <SystolicBPSlider />
//               </div>

//               {/* DiastolicBPSlider Component */}
//               <div className="col-span-1">
//                 <DiastolicBPSlider />
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 flex flex-row justify-center items-center gap-x-6">
//             <button
//               type="button"
//               className="rounded-md bg-red-600 m-20 mr-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//               onClick={cancelVal}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="rounded-md bg-green-600 m-20 ml-0 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               onClick={submitVal}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Dataentry;

import React, { useState, useContext } from "react";
import "./Dataentry.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";
import HeartRateButton from "./HeartRateButton";
import BodyTemperatureSlider from "./BodyTemperatureButton";
import SPO2Slider from "./SPO2Button";
import SystolicBPSlider from "./SystolicBPButton";
import DiastolicBPSlider from "./DiastolicBPButton";
import Infobutton from "../Infobutton/Infobutton";
import Panel from "../Home/Panel";
import axios from "axios";
import Footer from "../Footer";

function Dataentry() {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("abc");
  const [patientName, setPatientName] = useState("abc");
  const [doctorName, setDoctorName] = useState("abc");
  const [bodyTemp, setBodyTemp] = useState("97");
  const [heartRate, setHeartRate] = useState("100");
  const [spo2Value, setSpo2Value] = useState("89");
  const [systolicBP, setSystolicBP] = useState("100");
  const [diastolicBP, setDiastolicBP] = useState("100");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const submitVal = async (e) => {
    e.preventDefault();

    const formData = {
      patientId: patientId,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      heartRate: heartRate,
      diastolicBP: diastolicBP,
      systolicBP: systolicBP,
      bodyTemp: bodyTemp,
      spo2Value: spo2Value,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/patientrecords/",
        formData
      );
      console.log("Data submitted successfully:", response.data);
      alert("Data submitted successfully");
      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.error("Error submitting data:", error.response.data);
        alert("Failed to submit data: " + error.response.data.detail);
      } else {
        console.error("Error submitting data:", error.message);
        alert("Failed to submit data: " + error.message);
      }
    }

    // try {
    //   const response = await axios.post(
    //     "http://127.0.0.1:8000/api/patientsrecordlist/",
    //     formData
    //   );
    //   console.log("Data submitted successfully:", response.data);
    //   alert("Data submitted successfully");
    //   navigate("/home");
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    //   alert("Failed to submit data");
    // }
  };

  const cancelVal = (e) => {
    e.preventDefault();
    alert("Your data won't be saved anymore");
    navigate("/home");
  };
  const getheartRate = (data) => {
    setHeartRate(data);
  };

  const getbodyTemp = (data) => {
    setBodyTemp(data);
  };
  const getdiastolicBP = (data) => {
    setDiastolicBP(data);
  };
  const getspo2Value = (data) => {
    setSpo2Value(data);
  };
  const getsystolicBP = (data) => {
    setSystolicBP(data);
  };
  const handlePatientSelect = (patient) => {
    setPatientId(patient.patientId);
    setPatientName(patient.patientName);
    setDoctorName(patient.doctorName);
    // You can perform additional actions here with the selected patient ID
    //console.log("Selected Patient ID:", patientId);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 font-roboto">
        <div className="space-y-12 mr-5 ml-5">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-row justify-between">
              <h1 className="text-base font-extrabold mt-2 leading-7 text-gray-900">
                VITALS ENTRY PAGE
              </h1>
            </div>
            <p className="text-sm leading-6 text-gray-800">
              This Information will be Confidential
            </p>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Patient ID */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block font-semibold leading-6 text-gray-900"
                >
                  Patient ID{" "}
                  <Infobutton
                    message={`-Enter the id of patient
                 -ex : 12345678`}
                  />
                </label>
                <div className="mt-2">
                  <Panel onPatientSelect={handlePatientSelect} />
                </div>
              </div>
              {/* Patient Name */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block font-semibold leading-6 text-gray-900"
                >
                  Patient Name
                  <Infobutton
                    message={`Enter the name of patient
                   -ex: Aarav Sharma`}
                  />
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-900 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block flex-1 border-0 bg-transparent p-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Patient Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {/* Doctor's Name Input */}
            <div className="col-span-1 p-4 rounded-xl shadow-lg">
              <label
                htmlFor="doctor_name"
                className="block font-semibold leading-6 text-gray-900"
              >
                Doctor's Name{" "}
                <Infobutton message="Enter the name of doctor under whom the patient is being supervised -ex: Dr. Vivek Patel" />
              </label>
              <div className="mt-2 font-bold">
                <input
                  id="doctor_name"
                  name="doctor_name"
                  type="text"
                  className="ent_clr block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter Doctor's Name"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Date of Entry Input */}
            <div className="col-span-1 p-4 rounded-xl shadow-lg">
              <label
                htmlFor="appointment_date"
                className="block font-semibold leading-6 text-gray-900"
              >
                Date of Entry{" "}
                <Infobutton message="Enter the Date of entry of vitals signs by selecting in given calendar" />
              </label>
              <div className="mt-2">
                <input
                  id="appointment_date"
                  name="appointment_date"
                  type="date"
                  className="ent_clr block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Time of Entry Input */}
            <div className="col-span-1 p-4 rounded-xl shadow-lg">
              <label
                htmlFor="appointment_time"
                className="block font-semibold leading-6 text-gray-900"
              >
                Time of Entry{" "}
                <Infobutton message="Enter the Time of entry of vitals signs" />
              </label>
              <div className="mt-2">
                <input
                  id="appointment_time"
                  name="appointment_time"
                  type="time"
                  className="ent_clr block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* HeartRateSlider Component */}
            <div className="col-span-1">
              <HeartRateButton getheartRate={getheartRate} />
            </div>

            {/* BodyTemperatureSlider Component */}
            <div className="col-span-1">
              <BodyTemperatureSlider getbodyTemp={getbodyTemp} />
            </div>

            {/* SPO2Slider Component */}
            <div className="col-span-1">
              <SPO2Slider getspo2Value={getspo2Value} />
            </div>

            {/* SystolicBPSlider Component */}
            <div className="col-span-1">
              <SystolicBPSlider getsystolicBP={getsystolicBP} />
            </div>

            {/* DiastolicBPSlider Component */}
            <div className="col-span-1">
              <DiastolicBPSlider getdiastolicBP={getdiastolicBP} />
            </div>
          </div>

          <div className="mt-8 flex justify-center items-center space-x-6">
            <button
              type="button"
              className="rounded-md bg-red-600 m-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
              onClick={cancelVal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-600 m-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              onClick={submitVal}
            >
              Submit
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Dataentry;
