// import React, { useState, useEffect, useMemo } from "react";
// import { FaSortUp, FaSortDown } from "react-icons/fa";
// import { useTable, useSortBy } from "react-table";
// import { Link } from "react-router-dom";

// function PatientDetailsTable() {
//   const [patients, setPatients] = useState([]);
//   const [editPatient, setEditPatient] = useState(null);
//   const [formData, setFormData] = useState({
//     patientId: "",
//     patientName: "",
//     doctorName: "",
//     medConditions: "",
//     bed: "",
//   });

//   useEffect(() => {
//     async function fetchPatients() {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/patientslist/");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setPatients(data);
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//       }
//     }

//     fetchPatients();
//   }, []);

//   const handleDelete = async (patientId) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/patients/${patientId}/`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         setPatients((prevPatients) =>
//           prevPatients.filter((patient) => patient.patientId !== patientId)
//         );
//       } else {
//         throw new Error(`Failed to delete patient with ID: ${patientId}`);
//       }
//     } catch (error) {
//       console.error("Error deleting patient:", error);
//     }
//   };

//   const handleEdit = (patient) => {
//     setEditPatient(patient);
//     setFormData({
//       patientId: patient.patientId,
//       patientName: patient.patientName,
//       doctorName: patient.doctorName,
//       medConditions: patient.medConditions,
//       bed: patient.bed,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/patients/${formData.patientId}/`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (response.ok) {
//         setPatients((prevPatients) =>
//           prevPatients.map((patient) =>
//             patient.patientId === formData.patientId ? formData : patient
//           )
//         );
//         setEditPatient(null);
//       } else {
//         throw new Error("Failed to update patient details");
//       }
//     } catch (error) {
//       console.error("Error updating patient:", error);
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Patient ID",
//         accessor: "patientId",
//         Cell: ({ value }) => (
//           <Link to={`/disease_summary/${value}`} className="text-blue-500 hover:underline">
//             {value}
//           </Link>
//         ),

//       },
//       {
//         Header: "Patient Name",
//         accessor: "patientName",
//       },
//       {
//         Header: "Doctor Name",
//         accessor: "doctorName",
//       },
//       {
//         Header: "Medical Conditions",
//         accessor: "medConditions",
//       },
//       {
//         Header: "Bed Number",
//         accessor: "bed",
//       },
//       {
//         Header: "Actions",
//         Cell: ({ row }) => (
//           <div className="flex justify-center">
//             <div className="flex gap-2">
//               <button
//                 className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 style={{ minWidth: "65px", display: "flex", justifyContent: "center", alignItems: "center" }}
//                 onClick={() => handleEdit(row.original)}
//               >
//                 <div className="font-bold">Edit</div>
//               </button>
//               <button
//                 className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 style={{ minWidth: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}
//                 onClick={() => handleDelete(row.original.patientId)}
//               >
//                 <div className="font-bold">Delete</div>
//               </button>
//             </div>
//           </div>
//         ),

//         style: {
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }
//       }
//     ],
//     []
//   );

//   const data = useMemo(() => patients, [patients]);

//   const tableInstance = useTable({ columns, data }, useSortBy);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     tableInstance;

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg mt-0">
//       <h2 className="text-lg font-bold text-gray-900 mb-2">Patient Details</h2>
//       <div className="overflow-x-auto">
//         {patients.length > 0 ? (
//           <table
//             {...getTableProps()}
//             className="w-full shadow-xl rounded-md border-collapse m-auto"
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}

//                 >
//                   {headerGroup.headers.map((column) => (
//                     <th
//                       {...column.getHeaderProps(column.getSortByToggleProps())}
//                       className="p-5 bg-gray-600 text-white text-left first-of-type:rounded-l-lg last-of-type:rounded-r-lg"
//                     >
//                       {column.render("Header")}
//                       <span>
//                         {/* {column.isSorted ? (
//                           column.isSortedDesc ? (
//                             <FaSortDown className="inline" />
//                           ) : (
//                             <FaSortUp className="inline" />
//                           )
//                         ) : (
//                           ""
//                         )} */}
//                         {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
//                       </span>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody
//               {...getTableBodyProps()}
//               className="divide-y divide-gray-200"
//             >
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()}>
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         className="px-4 py-4 whitespace-nowrap font-medium"
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-500 text-center py-4">
//             No patient data available
//           </p>
//         )}
//       </div>

//       {editPatient && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg">
//             <h2 className="text-lg font-bold mb-4">Edit Patient Details</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Patient Name</label>
//                 <input
//                   type="text"
//                   name="patientName"
//                   value={formData.patientName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Doctor Name</label>
//                 <input
//                   type="text"
//                   name="doctorName"
//                   value={formData.doctorName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">medConditions</label>
//                 <input
//                   type="text"
//                   name="medConditions"
//                   value={formData.medConditions}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Bed</label>
//                 <input
//                   type="text"
//                   name="bed"
//                   value={formData.bed}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="flex justify-around">
//                 <button
//                   type="button"
//                   onClick={() => setEditPatient(null)}
//                   className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PatientDetailsTable;

import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import Infobutton from "../Infobutton/Infobutton";

function PatientDetailsTable() {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorName: "",
    ward: "",
    pastMedHis: "",
    patientAge: "",
    patientHeight: "",
    patientBloodGroup: "",
    patientSex: "",
    bed: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/patientslist/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleDelete = async (patientId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/patients/${patientId}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient.patientId !== patientId)
        );
      } else {
        throw new Error(`Failed to delete patient with ID: ${patientId}`);
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setFormData({
      patientId: patient.patientId,
      patientName: patient.patientName,
      doctorName: patient.doctorName,
      
      ward: patient.ward,
      
      pastMedHis: patient.pastMedHis,
      patientAge: patient.patientAge,
      patientHeight: patient.patientHeight,
      patientBloodGroup: patient.patientBloodGroup,
      patientSex: patient.patientSex,
      bed: patient.bed,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      ward: formData.ward === "" ? null : formData.ward,
      bed: formData.bed === "" ? null : formData.bed,
    };
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/patients/${formData.patientId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );
      if (response.ok) {
        fetchPatients(); // Fetch updated patient list after successful update
        alert("Patient details updated successfully");
        setEditPatient(null); // Clear edit state
      } else {
        throw new Error("Failed to update patient details");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Patient ID",
        accessor: "patientId",
        Cell: ({ value }) => (
          <Link
            to={`/disease_summary/${value}`}
            className="text-blue-500 hover:underline"
          >
            {value}
          </Link>
        ),
      },
      {
        Header: "Patient Name",
        accessor: "patientName",
      },
      {
        Header: "Doctor Name",
        accessor: "doctorName",
      },
      {
        Header: "Ward",
        accessor: "ward",
      },
      {
        Header: "Bed Number",
        accessor: "bed",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex flex-row p-2 justify-start">
            <div className="flex justify-around gap-4">
              <button
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  minWidth: "65px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleEdit(row.original)}
              >
                <div className="font-bold">Edit</div>
              </button>
              <button
                className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                style={{
                  minWidth: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleDelete(row.original.patientId)}
              >
                <div className="font-bold">Delete</div>
              </button>
            </div>
          </div>
        ),
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    ],
    []
  );

  const data = useMemo(() => patients, [patients]);

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-0">
      <h1 className="text-lg font-bold text-gray-900 mb-2">
        Patient Details
        <Infobutton
          message={`This table displays the existing patient records. Clicking on a patient’s ID will redirect you to a detailed summary of their medical history and current diagnoses.`}
        />
      </h1>
      <div className="overflow-x-auto">
        {patients.length > 0 ? (
          <table
            {...getTableProps()}
            className="w-full shadow-xl rounded-md border-collapse m-auto"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-5  bg-gray-600 text-white text-left first-of-type:rounded-l-lg last-of-type:rounded-r-lg"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="divide-y divide-gray-200"
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-4 whitespace-nowrap font-medium"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No patient data available
          </p>
        )}
      </div>

      {editPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Edit Patient Details</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-900">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Patient Name"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-900">
                    Patient ID *
                  </label>
                  <input
                    type="text"
                    id="patientId"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Patient ID"
                    pattern="[0-9]{4}" // Pattern for patient ID like 0001
                    title="Patient ID must be in the format of 4 digits (e.g., 0001)"
                    readOnly // Ensure patient ID is read-only for editing
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-900">
                    Doctor Name *
                  </label>
                  <input
                type="text"
                id="doctorName"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Doctor Name"
                required
              />
            </div>
           
            <div>
              <label className="block font-semibold text-gray-900">
                Ward
              </label>
              {/* <input
                type="text"
                id="ward"
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Ward"
                
              /> */}
              <select
                            id="ward"
                            name="ward"
                            value={formData.ward}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="">--Select Ward--</option>
                            <option value="Tc1">Tc1</option>
                            <option value="Tc2">Tc2</option>
                            <option value="Tc3">Tc3</option>
                          </select>
            </div>
            
            <div>
              <label className="block font-semibold text-gray-900">
                Past Medical History *
              </label>
              <input
                type="text"
                id="pastMedHis"
                name="pastMedHis"
                value={formData.pastMedHis}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Past Medical History"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900">
                Patient Age *
              </label>
              <input
                type="number"
                id="patientAge"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Patient Age"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900">
                Patient Height *
              </label>
              <input
                type="text"
                id="patientHeight"
                name="patientHeight"
                value={formData.patientHeight}
                onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
              <label className="block font-semibold text-gray-900">
                Patient Sex
              </label>
              <input
                type="text"
                id="patientSex"
                name="patientSex"
                value={formData.patientSex}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Patient Sex"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900">
                Bed Number
              </label>
              <input
                type="text"
                id="bed"
                name="bed"
                value={formData.bed}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Bed Number"
                
              />
            </div>
          </div>
          <div className="flex justify-end mt-6 ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setEditPatient(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
);
}

export default PatientDetailsTable;