// import React, { useState } from 'react';

// const Details_page = () => {
//   const initialDetails = {
//     description: "No description available.",
//     treatment: "No treatment information available.",
//     diagnosis: "No diagnosis information available.",
//     symptoms: "No symptoms information available."
//   };

//   const [details, setDetails] = useState(initialDetails);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     // Save logic (could be API call)
//     console.log("Saving edited details:", details);

//     // For demonstration, reset to initial state after saving
//     setIsEditing(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDetails({ ...details, [name]: value });
//   };

//   const renderEditFields = () => {
//     return (
//       <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-4 border rounded-lg shadow">
//           <h3 className="text-md font-semibold text-gray-800 mb-2">Description</h3>
//           <textarea
//             className="border rounded-lg w-full p-2"
//             name="description"
//             value={details.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="p-4 border rounded-lg shadow">
//           <h3 className="text-md font-semibold text-gray-800 mb-2">Treatment</h3>
//           <textarea
//             className="border rounded-lg w-full p-2"
//             name="treatment"
//             value={details.treatment}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="p-4 border rounded-lg shadow">
//           <h3 className="text-md font-semibold text-gray-800 mb-2">Diagnosis</h3>
//           <textarea
//             className="border rounded-lg w-full p-2"
//             name="diagnosis"
//             value={details.diagnosis}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="p-4 border rounded-lg shadow">
//           <h3 className="text-md font-semibold text-gray-800 mb-2">Symptoms</h3>
//           <textarea
//             className="border rounded-lg w-full p-2"
//             name="symptoms"
//             value={details.symptoms}
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//     );
//   };

//   const renderEditButtons = () => {
//     return (
//       <div className="mt-4">
//         <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
//           Save
//         </button>
//         <button onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
//           Cancel
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {isEditing ? renderEditButtons() : <button onClick={handleEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//         Edit
//       </button>}
//       {isEditing ? renderEditFields() : (
//         <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="p-4 border rounded-lg shadow">
//             <h3 className="text-md font-semibold text-gray-800 mb-2">Description</h3>
//             <p>{details.description}</p>
//           </div>
//           <div className="p-4 border rounded-lg shadow">
//             <h3 className="text-md font-semibold text-gray-800 mb-2">Treatment</h3>
//             <p>{details.treatment}</p>
//           </div>
//           <div className="p-4 border rounded-lg shadow">
//             <h3 className="text-md font-semibold text-gray-800 mb-2">Diagnosis</h3>
//             <p>{details.diagnosis}</p>
//           </div>
//           <div className="p-4 border rounded-lg shadow">
//             <h3 className="text-md font-semibold text-gray-800 mb-2">Symptoms</h3>
//             <p>{details.symptoms}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Details_page;

import React, { useState } from "react";

const Details_page = () => {
  const initialDetails = {
    description: "No description available.",
    treatment: "No treatment information available.",
    diagnosis: "No diagnosis information available.",
    symptoms: "No symptoms information available.",
  };

  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save logic (could be API call)
    console.log("Saving edited details:", details);

    // For demonstration, reset to initial state after saving
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset details to initial state and exit edit mode
    setDetails(initialDetails);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const renderEditFields = () => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Description
          </h3>
          <textarea
            className="border rounded-lg w-full p-2"
            name="description"
            value={details.description}
            onChange={handleChange}
          />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Treatment
          </h3>
          <textarea
            className="border rounded-lg w-full p-2"
            name="treatment"
            value={details.treatment}
            onChange={handleChange}
          />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Diagnosis
          </h3>
          <textarea
            className="border rounded-lg w-full p-2"
            name="diagnosis"
            value={details.diagnosis}
            onChange={handleChange}
          />
        </div>
        <div className="p-4 border rounded-lg shadow">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Symptoms</h3>
          <textarea
            className="border rounded-lg w-full p-2"
            name="symptoms"
            value={details.symptoms}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  };

  const renderEditButtons = () => {
    return (
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg m-4 mr-2"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="mt-4">
      {isEditing ? (
        renderEditFields()
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Description
            </h3>
            <p>{details.description}</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Treatment
            </h3>
            <p>{details.treatment}</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Diagnosis
            </h3>
            <p>{details.diagnosis}</p>
          </div>
          <div className="p-4 border rounded-lg shadow">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Symptoms
            </h3>
            <p>{details.symptoms}</p>
          </div>
        </div>
      )}
      {isEditing && renderEditButtons()}
      {!isEditing && (
        <div className="flex justify-end">
        <button
          onClick={handleEdit}
          className="bg-green-500 m-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Edit
        </button>
        </div>
      )}
    </div>
  );
};

export default Details_page;
