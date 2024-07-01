// import React, { useState } from "react";

// function AddPatientForm() {
//   const initialFormData = {
//     patientName: "",
//     patientId: "",
//     doctorName: "",
    
//     ward: " ",
//     pastMedHis: "",
//     patientAge: "",
//     patientHeight: "",
//     patientSex: "",
//     patientBloodGroup: "",
//     bed: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [showForm, setShowForm] = useState(false);
//   const [showHint, setShowHint] = useState(false); // State to manage hint visibility

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     if (e.target.name === "patientId") {
//       setShowHint(true); // Show hint when typing in patientId field
//     } else {
//       setShowHint(false); // Hide hint for AB fields
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const dataToSubmit = {
//       ...formData,
//       ward: formData.ward === "" ? null : formData.ward,
//     };

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/api/patientslistcreate/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       alert("Data submitted successfully");
//       window.location.reload();
//       setFormData(initialFormData); // Reset form data after successful submission
//       setShowForm(false); // Close the popup form after submission
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       alert("Failed to submit data");
//     }
//   };

//   const handleCancel = () => {
//     setFormData(initialFormData); // Reset form data
//     setShowForm(false); // Close the form
//   };

//   return (
//     <>
//       <div className="bg-gray-50 p-4">
//         <button
//           className="bg-green-600 hover:bg-green-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           onClick={() => setShowForm(true)}
//         >
//           Add New Patient +
//         </button>

//         {showForm && (
//           <div className="fixed z-10 inset-0 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//               <div className="fixed inset-0 transition-opacity">
//                 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//               </div>
//               <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
//               &#8203;
//               <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//                 <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                   <h1 className="text-lg font-semibold text-gray-900 mb-4">
//                     Patient Information Form
//                   </h1>
//                   <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div className="overflow-y-auto max-h-96">
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                           <label
//                             htmlFor="patientName"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Patient Name
//                           </label>
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
//                           <label
//                             htmlFor="patientId"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Patient ID
//                           </label>
//                           <div className="relative">
//                             <input
//                               type="text"
//                               id="patientId"
//                               name="patientId"
//                               value={formData.patientId}
//                               onChange={handleChange}
//                               onFocus={() => setShowHint(true)} // Show hint on focus
//                               onBlur={() => setShowHint(false)} // Hide hint on blur
//                               className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                               placeholder="Patient ID"
//                               pattern="[0-9]{4}" // Pattern for patient ID like 0001
//                               title="Patient ID must be in the format of 4 digits (e.g., 0001)"
//                               required
//                             />
//                             {showHint && (
//                               <small className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
//                                 Format: XXXX
//                               </small>
//                             )}
//                           </div>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="doctorName"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Doctor Name
//                           </label>
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
//                         {/* <div>
//                           <label
//                             htmlFor="medConditions"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Medical Conditions
//                           </label>
//                           <select
                            
//                             id="medConditions"
//                             name="medConditions"
//                             value={formData.medConditions}
//                             onChange={handleChange}
                            
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             required
//                           >
//                             <option value="">Select Medical-Conditions</option>
//                             <option value="Asthama">Asthama</option>
//                             <option value="Cough">Cough</option>
//                             <option value="Heart Disease">Heart Disease</option>
//                             <option value="Hypertension">Hypertension(High BP)</option>
//                             <option value="Hypotension">Hypotension</option>
//                             <option value="Fever">Fever</option>
//                             </select>
                          
//                         </div> */}
//                         <div>
//                           <label
//                             htmlFor="Ward"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Ward
//                           </label>
//                           <select
                            
//                             id="ward"
//                             name="ward"
//                             value={formData.ward}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            
//                           >
//                             <option value="">--Select Ward--</option>
//                             <option value="Tc1">Tc1</option>
//                             <option value="Tc2">Tc2</option>
//                             <option value="Tc3">Tc3</option>

//                           </select>
//                         </div>
                        
//                         <div>
//                           <label
//                             htmlFor="pastMedHis"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Past Medical History
//                           </label>
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
//                           <label
//                             htmlFor="patientAge"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Patient Age
//                           </label>
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
//                           <label
//                             htmlFor="patientHeight"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Patient Height(cm)
//                           </label>
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
//                           <label
//                             htmlFor="patientBloodGroup"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Patient Blood Group
//                           </label>
//                           <select
//                             id="patientBloodGroup"
//                             name="patientBloodGroup"
//                             value={formData.patientBloodGroup}
//                             onChange={handleChange}
//                             className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             required
//                           >
//                             <option value="">Select Patient Blood Group</option>
//                             <option value="O+">O+</option>
//                             <option value="O-">O-</option>
//                             <option value="A+">A+</option>
//                             <option value="A-">A-</option>
//                             <option value="B+">B+</option>
//                             <option value="B-">B-</option>
//                             <option value="AB+">AB+</option>
//                             <option value="AB-">AB-</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="patientSex"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Patient Sex
//                           </label>
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
//                         {/* <div>
//                           <label
//                             htmlFor="disease"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Disease
//                           </label>
//                           <input
//                             type="text"
//                             id="disease"
//                             name="disease"
//                             value={formData.disease}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Disease"
//                             required
//                           />
//                         </div> */}
//                         <div>
//                           <label
//                             htmlFor="bed"
//                             className="block font-semibold text-gray-900"
//                           >
//                             Bed
//                           </label>
//                           <input
//                             type="number"
//                             id="bed"
//                             name="bed"
//                             value={formData.bed}
//                             onChange={handleChange}
//                             className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             placeholder="Enter Bed No."
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                       <button
//                         type="submit"
//                         className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
//                       >
//                         Submit
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
//                       >
//                         Cancel
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
import React, { useState } from "react";

function AddPatientForm() {
  const initialFormData = {
    patientName: "",
    patientId: "",
    doctorName: "",
    ward: "",
    pastMedHis: "",
    patientAge: "",
    patientHeight: "",
    patientSex: "",
    patientBloodGroup: "",
    bed: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showForm, setShowForm] = useState(false);
  const [showHint, setShowHint] = useState(false); // State to manage hint visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "patientId") {
      setShowHint(true); // Show hint when typing in patientId field
    } else {
      setShowHint(false); // Hide hint for other fields
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if ward is an empty string and set it to null
    const dataToSubmit = {
      ...formData,
      ward: formData.ward === "" ? null : formData.ward,
      bed: formData.bed === "" ? null : formData.bed,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/patientslistcreate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Data submitted successfully");
      window.location.reload();
      setFormData(initialFormData); // Reset form data after successful submission
      setShowForm(false); // Close the popup form after submission
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
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
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
              &#8203;
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h1 className="text-lg font-semibold text-gray-900 mb-4">
                    Patient Information Form
                  </h1>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="overflow-y-auto max-h-96">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="patientName"
                            className="block font-semibold text-gray-900"
                          >
                            Patient Name *
                          </label>
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
                          <label
                            htmlFor="patientId"
                            className="block font-semibold text-gray-900"
                          >
                            Patient ID *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="patientId"
                              name="patientId"
                              value={formData.patientId}
                              onChange={handleChange}
                              onFocus={() => setShowHint(true)} // Show hint on focus
                              onBlur={() => setShowHint(false)} // Hide hint on blur
                              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Patient ID"
                              pattern="[0-9]{4}" // Pattern for patient ID like 0001
                              title="Patient ID must be in the format of 4 digits (e.g., 0001)"
                              required
                            />
                            {showHint && (
                              <small className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                                Format: XXXX
                              </small>
                            )}
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="doctorName"
                            className="block font-semibold text-gray-900"
                          >
                            Doctor Name *
                          </label>
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
                          <label
                            htmlFor="ward"
                            className="block font-semibold text-gray-900"
                          >
                            Ward
                          </label>
                          <select
                            id="ward"
                            name="ward"
                            value={formData.ward}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">--Select Ward--</option>
                            <option value="Tc1">Tc1</option>
                            <option value="Tc2">Tc2</option>
                            <option value="Tc3">Tc3</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="pastMedHis"
                            className="block font-semibold text-gray-900"
                          >
                            Past Medical History *
                          </label>
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
                          <label
                            htmlFor="patientAge"
                            className="block font-semibold text-gray-900"
                          >
                            Patient Age *
                          </label>
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
                          <label
                            htmlFor="patientHeight"
                            className="block font-semibold text-gray-900"
                          >
                            Patient Height (cm) *
                          </label>
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
                          <label
                            htmlFor="patientBloodGroup"
                            className="block font-semibold text-gray-900"
                          >
                            Patient Blood Group *
                          </label>
                          <select
                            id="patientBloodGroup"
                            name="patientBloodGroup"
                            value={formData.patientBloodGroup}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                          >
                            <option value="">Select Patient Blood Group</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="patientSex"
                            className="block font-semibold text-gray-900"
                          >
                            Patient Sex *
                          </label>
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
                          <label
                            htmlFor="bed"
                            className="block font-semibold text-gray-900"
                          >
                            Bed
                          </label>
                          <input
                            type="text"
                            id="bed"
                            name="bed"
                            value={formData.bed}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Bed Number"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
