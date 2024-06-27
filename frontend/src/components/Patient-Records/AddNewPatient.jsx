// import React, { useState } from 'react';


// function AddPatientForm() {
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

//   const [showForm, setShowForm] = useState(false);

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
//       window.location.reload();
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
//       // Close the popup form after submission
//       setShowForm(false);
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('Failed to submit data');
//     }
//   };

//   return (
//     <>
//       <div className="bg-gray-50 p-4">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           onClick={() => setShowForm(true)}
//         >
//           Add New Patient
//         </button>

//         {showForm && (
//           <div className="fixed z-10 inset-0 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//               <div className="fixed inset-0 transition-opacity">
//                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//               </div>

//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
//               <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                 <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <h1 className="text-lg font-semibold text-gray-900 mb-4">Patient Information Form</h1>
//                   <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div className="overflow-y-auto max-h-96">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                           <label htmlFor="patientName" className="block font-semibold text-gray-900">Patient Name</label>
//                           <input
//                             type="text"
//                             id="patientName"
//                             name="patientName"
//                             value={formData.patientName}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Patient Name"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="patientId" className="block font-semibold text-gray-900">Patient ID</label>
//                           <input
//                             type="text"
//                             id="patientId"
//                             name="patientId"
//                             value={formData.patientId}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Patient ID"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="doctorName" className="block font-semibold text-gray-900">Doctor Name</label>
//                           <input
//                             type="text"
//                             id="doctorName"
//                             name="doctorName"
//                             value={formData.doctorName}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Doctor Name"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="medConditions" className="block font-semibold text-gray-900">Medical Conditions</label>
//                           <input
//                             type="text"
//                             id="medConditions"
//                             name="medConditions"
//                             value={formData.medConditions}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Medical Conditions"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="location" className="block font-semibold text-gray-900">Location</label>
//                           <input
//                             type="text"
//                             id="location"
//                             name="location"
//                             value={formData.location}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Location"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="medication" className="block font-semibold text-gray-900">Medication</label>
//                           <input
//                             type="text"
//                             id="medication"
//                             name="medication"
//                             value={formData.medication}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Medication"
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="pastMedHis" className="block font-semibold text-gray-900">Past Medical History</label>
//                           <input
//                             type="text"
//                             id="pastMedHis"
//                             name="pastMedHis"
//                             value={formData.pastMedHis}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Past Medical History"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="patientAge" className="block font-semibold text-gray-900">Patient Age</label>
//                           <input
//                             type="number"
//                             id="patientAge"
//                             name="patientAge"
//                             value={formData.patientAge}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Patient Age"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="patientHeight" className="block font-semibold text-gray-900">Patient Height(cm)</label>
//                           <input
//                             type="number"
//                             id="patientHeight"
//                             name="patientHeight"
//                             value={formData.patientHeight}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Patient Height"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="patientSex" className="block font-semibold text-gray-900">Patient Sex</label>
//                           <select
//                             id="patientSex"
//                             name="patientSex"
//                             value={formData.patientSex}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             required
//                           >
//                             <option value="">Select Patient Sex</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label htmlFor="patientBloodGroup" className="block font-semibold text-gray-900">Patient Blood Group</label>
//                           <select
//                             id="patientBloodGroup"
//                             name="patientBloodGroup"
//                             value={formData.patientBloodGroup}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Patient Blood Group"
//                             required
//                           >
//                             <option value="">Blood Group</option>
//                             <option value="A+">A+</option>
//                             <option value="A-">A-</option>
//                             <option value="O+">O+</option>
//                             <option value="O-">O-</option>
//                             <option value="B+">B+</option>
//                             <option value="B-">B-</option>
//                             <option value="AB+">AB+</option>
//                             <option value="AB-">AB-</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label htmlFor="disease" className="block font-semibold text-gray-900">Disease</label>
//                           <input
//                             type="text"
//                             id="disease"
//                             name="disease"
//                             value={formData.disease}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Patient disease"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label htmlFor="room" className="block font-semibold text-gray-900">Room No:</label>
//                           <input
//                             type="text"
//                             id="room"
//                             name="room"
//                             value={formData.room}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Room No"
//                             required
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex justify-end mt-4">
//                       <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default AddPatientForm;
import React, { useState } from 'react';

function AddPatientForm() {
  const initialFormData = {
    patientName: '',
    patientId: '',
    doctorName: '',
    medConditions: '',
    location: '',
    medication: '',
    pastMedHis: '',
    patientAge: '',
    patientHeight: '',
    patientSex: '',
    patientBloodGroup: '',
    disease: '',
    room: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/patientslistcreate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('Data submitted successfully');
      window.location.reload();
      setFormData(initialFormData); // Reset form data after successful submission
      setShowForm(false); // Close the popup form after submission
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData); // Reset form data
    setShowForm(false); // Close the form
  };

  return (
    <>
      <div className="bg-gray-50 p-4">
        <button
          className="bg-green-600 hover:bg-green-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowForm(true)}
        >
          Add New Patient +
        </button>

        {showForm && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h1 className="text-lg font-semibold text-gray-900 mb-4">Patient Information Form</h1>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="overflow-y-auto max-h-96">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="patientName" className="block font-semibold text-gray-900">Patient Name</label>
                          <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Patient Name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="patientId" className="block font-semibold text-gray-900">Patient ID</label>
                          <input
                            type="text"
                            id="patientId"
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Patient ID"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="doctorName" className="block font-semibold text-gray-900">Doctor Name</label>
                          <input
                            type="text"
                            id="doctorName"
                            name="doctorName"
                            value={formData.doctorName}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Doctor Name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="medConditions" className="block font-semibold text-gray-900">Medical Conditions</label>
                          <input
                            type="text"
                            id="medConditions"
                            name="medConditions"
                            value={formData.medConditions}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Medical Conditions"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block font-semibold text-gray-900">Location</label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Location"
                          />
                        </div>
                        <div>
                          <label htmlFor="medication" className="block font-semibold text-gray-900">Medication</label>
                          <input
                            type="text"
                            id="medication"
                            name="medication"
                            value={formData.medication}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Medication"
                          />
                        </div>
                        <div>
                          <label htmlFor="pastMedHis" className="block font-semibold text-gray-900">Past Medical History</label>
                          <input
                            type="text"
                            id="pastMedHis"
                            name="pastMedHis"
                            value={formData.pastMedHis}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Past Medical History"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="patientAge" className="block font-semibold text-gray-900">Patient Age</label>
                          <input
                            type="number"
                            id="patientAge"
                            name="patientAge"
                            value={formData.patientAge}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Patient Age"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="patientHeight" className="block font-semibold text-gray-900">Patient Height(cm)</label>
                          <input
                            type="number"
                            id="patientHeight"
                            name="patientHeight"
                            value={formData.patientHeight}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Patient Height"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="patientSex" className="block font-semibold text-gray-900">Patient Sex</label>
                          <select
                            id="patientSex"
                            name="patientSex"
                            value={formData.patientSex}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">Select Patient Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="patientBloodGroup" className="block font-semibold text-gray-900">Patient Blood Group</label>
                          <select
                            id="patientBloodGroup"
                            name="patientBloodGroup"
                            value={formData.patientBloodGroup}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Patient Blood Group"
                            required
                          >
                            <option value="">Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="disease" className="block font-semibold text-gray-900">Disease</label>
                          <input
                            type="text"
                            id="disease"
                            name="disease"
                            value={formData.disease}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Patient disease"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="room" className="block font-semibold text-gray-900">Room No:</label>
                          <input
                            type="text"
                            id="room"
                            name="room"
                            value={formData.room}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Room No"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AddPatientForm;
