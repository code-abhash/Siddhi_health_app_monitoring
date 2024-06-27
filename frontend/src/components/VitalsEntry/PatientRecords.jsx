// import React, { useState } from 'react';
// import Navbar from '../Home/Navbar';
// import Footer from '../Footer';


// function PatientForm() {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     patientId: '',
//     doctorName: '',
//     medConditions: '',
//     location: '',
//     medication: '',
//     pastMedHis: '',
//     patientAge: '',
//     patientHeight: '',
//     patientSex: '',
//     patientBloodGroup: '',
//     disease: '',
//     room: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/patientslistcreate/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       alert('Data submitted successfully');
//       // Reset form data after successful submission
//       setFormData({
//         patientName: '',
//         patientId: '',
//         doctorName: '',
//         medConditions: '',
//         location: '',
//         medication: '',
//         pastMedHis: '',
//         patientAge: '',
//         patientHeight: '',
//         patientSex: '',
//         patientBloodGroup: '',
//         disease: '',
//         room: '',
//       });
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('Failed to submit data');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-50 p-8">
//         <form className="space-y-8" onSubmit={handleSubmit}>
//           <div className="border-b pb-4">
//             <h1 className="text-lg font-semibold text-gray-900 mb-4">Patient Information Form</h1>
//             <div className="flex items-center gap-x-3">
              
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="patientName" className="block font-semibold text-gray-900">Patient Name</label>
//               <input
//                 type="text"
//                 id="patientName"
//                 name="patientName"
//                 value={formData.patientName}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Patient Name"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="patientId" className="block font-semibold text-gray-900">Patient ID</label>
//               <input
//                 type="text"
//                 id="patientId"
//                 name="patientId"
//                 value={formData.patientId}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Patient ID"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="doctorName" className="block font-semibold text-gray-900">Doctor Name</label>
//               <input
//                 type="text"
//                 id="doctorName"
//                 name="doctorName"
//                 value={formData.doctorName}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Doctor Name"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="medConditions" className="block font-semibold text-gray-900">Medical Conditions</label>
//               <input
//                 type="text"
//                 id="medConditions"
//                 name="medConditions"
//                 value={formData.medConditions}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Medical Conditions"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="location" className="block font-semibold text-gray-900">Location</label>
//               <input
//                 type="text"
//                 id="location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Location"
//               />
//             </div>
//             <div>
//               <label htmlFor="medication" className="block font-semibold text-gray-900">Medication</label>
//               <input
//                 type="text"
//                 id="medication"
//                 name="medication"
//                 value={formData.medication}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Medication"
//               />
//             </div>
//             <div>
//               <label htmlFor="pastMedHis" className="block font-semibold text-gray-900">Past Medical History</label>
//               <input
//                 type="text"
//                 id="pastMedHis"
//                 name="pastMedHis"
//                 value={formData.pastMedHis}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Past Medical History"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="patientAge" className="block font-semibold text-gray-900">Patient Age</label>
//               <input
//                 type="number"
//                 id="patientAge"
//                 name="patientAge"
//                 value={formData.patientAge}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Patient Age"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="patientHeight" className="block font-semibold text-gray-900">Patient Height</label>
//               <input
//                 type="text"
//                 id="patientHeight"
//                 name="patientHeight"
//                 value={formData.patientHeight}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Patient Height"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="patientSex" className="block font-semibold text-gray-900">Patient Sex</label>
//               <select
//                 id="patientSex"
//                 name="patientSex"
//                 value={formData.patientSex}
//                 onChange={handleChange}
//                 className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 required
//               >
//                 <option value="">Select Patient Sex</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="patientBloodGroup" className="block font-semibold text-gray-900">Patient Blood Group</label>
//               <input
//                 type="text"
//                 id="patientBloodGroup"
//                 name="patientBloodGroup"
//                 value={formData.patientBloodGroup}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Patient Blood Group"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//           <label htmlFor="disease" className="block font-semibold text-gray-900">Disease</label>
//           <input
//                 type="text"
//                 id="disease"
//                 name="disease"
//                 value={formData.disease}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Patient disease"
//                 required
//               />
//           </div>
//           <div>
//           <label htmlFor="room" className="block font-semibold text-gray-900">Room No:</label>
//           <input
//                 type="text"
//                 id="room"
//                 name="room"
//                 value={formData.room}
//                 onChange={handleChange}
//                 className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Enter Room No"
//                 required
//               />
//           </div>

//           <div className="flex justify-end mt-4">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default PatientForm;
