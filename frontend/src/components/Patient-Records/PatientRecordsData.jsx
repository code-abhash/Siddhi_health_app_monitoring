// import React, { useState, useEffect } from "react";

// function PatientDetailsTable() {
//   const [patients, setPatients] = useState([]);
//   const [editPatient, setEditPatient] = useState(null);
//   const [formData, setFormData] = useState({
//     patientId: "",
//     patientName: "",
//     doctorName: "",
//     disease: "",
//     room: "",
//   });
//   const [sortConfig, setSortConfig] = useState({
//     key: "patientId",
//     direction: "ascending",
//   });

//   useEffect(() => {
//     async function fetchPatients() {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/patientslist/"); // backend api to display list of all patients
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
//       ); // api to fetch patient by patientid
//       if (response.ok) {
//         setPatients(
//           patients.filter((patient) => patient.patientId !== patientId)
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
//       disease: patient.disease,
//       room: patient.room,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/patients/${formData.patientId}/`,
//         {
//           method: "PUT", //put to update value
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (response.ok) {
//         setPatients(
//           patients.map((patient) =>
//             patient.patientId === formData.patientId ? formData : patient
//           )
//         );
//         setEditPatient(null); // mapping backend and frontend patientid
//       } else {
//         throw new Error("Failed to update patient details");
//       }
//     } catch (error) {
//       console.error("Error updating patient:", error);
//     }
//   };

//   const sortedPatients = React.useMemo(() => {
//     let sortablePatients = [...patients];
//     if (sortConfig !== null) {
//       sortablePatients.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortablePatients;
//   }, [patients, sortConfig]);

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg mt-0">
//       <h2 className="text-lg font-bold text-gray-900 mb-2">Patient Details</h2>
//       <div className="overflow-x-auto">
//         {sortedPatients.length > 0 ? (
//           <table className="min-w-full bg-white border border-white">
//             <thead>
//               <tr className="bg-gray-600">
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold  uppercase tracking-wider cursor-pointer border-hidden rounded-l-md"
//                   onClick={() => requestSort("patientId")}
//                 >
//                   Patient ID
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold  uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("patientName")}
//                 >
//                   Patient Name
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold  uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("doctorName")}
//                 >
//                   Doctor Name
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold  uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("disease")}
//                 >
//                   Disease
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold  uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("room")}
//                 >
//                   Room Number
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-extrabold  uppercase tracking-wider border-hidden rounded-r-md">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-white">
//               {sortedPatients.map((patient) => (
//                 <tr key={patient.patientId}>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.patientId}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.patientName}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.doctorName}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.disease}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.room}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     <div className="p-4 flex flex-row gap-2 justify-around">
//                     <button
//                       className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       style={{ minWidth: "65px" }}
//                       onClick={() => handleEdit(patient)}
//                     >
//                       <div className="m-2 mr-4 ml-4 font-bold">Edit</div>
//                     </button>
//                     <button
//                       className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                       style={{ minWidth: "65px" }}
//                       onClick={() => handleDelete(patient.patientId)}
//                     >
//                       <div className="m-2 mr-4 ml-4 font-bold">Delete</div>
//                     </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
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
//                 <label className="block text-gray-700">Disease</label>
//                 <input
//                   type="text"
//                   name="disease"
//                   value={formData.disease}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Room</label>
//                 <input
//                   type="text"
//                   name="room"
//                   value={formData.room}
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

// import React, { useState, useEffect } from "react";
// import { FaSortUp, FaSortDown } from "react-icons/fa"; // Add this import for sorting icons

// function PatientDetailsTable() {
//   const [patients, setPatients] = useState([]);
//   const [editPatient, setEditPatient] = useState(null);
//   const [formData, setFormData] = useState({
//     patientId: "",
//     patientName: "",
//     doctorName: "",
//     disease: "",
//     room: "",
//   });
//   const [sortConfig, setSortConfig] = useState({
//     key: "patientId",
//     direction: "ascending",
//   });

//   useEffect(() => {
//     async function fetchPatients() {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/patientslist/"); // backend api to display list of all patients
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
//       ); // api to fetch patient by patientid
//       if (response.ok) {
//         setPatients(
//           patients.filter((patient) => patient.patientId !== patientId)
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
//       disease: patient.disease,
//       room: patient.room,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/patients/${formData.patientId}/`,
//         {
//           method: "PUT", //put to update value
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       if (response.ok) {
//         setPatients(
//           patients.map((patient) =>
//             patient.patientId === formData.patientId ? formData : patient
//           )
//         );
//         setEditPatient(null); // mapping backend and frontend patientid
//       } else {
//         throw new Error("Failed to update patient details");
//       }
//     } catch (error) {
//       console.error("Error updating patient:", error);
//     }
//   };

//   const sortedPatients = React.useMemo(() => {
//     let sortablePatients = [...patients];
//     if (sortConfig !== null) {
//       sortablePatients.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortablePatients;
//   }, [patients, sortConfig]);

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "ascending" ? (
//         <FaSortUp className="inline" />
//       ) : (
//         <FaSortDown className="inline" />
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg mt-0">
//       <h2 className="text-lg font-bold text-gray-900 mb-2">Patient Details</h2>
//       <div className="overflow-x-auto">
//         {sortedPatients.length > 0 ? (
//           <table className="min-w-full bg-white border border-white">
//             <thead>
//               <tr className="bg-gray-600 text-white">
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-wider cursor-pointer border-hidden rounded-l-md"
//                   onClick={() => requestSort("patientId")}
//                 >
//                   Patient ID {getSortIcon("patientId")}
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("patientName")}
//                 >
//                   Patient Name {getSortIcon("patientName")}
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("doctorName")}
//                 >
//                   Doctor Name {getSortIcon("doctorName")}
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("disease")}
//                 >
//                   Disease {getSortIcon("disease")}
//                 </th>
//                 <th
//                   className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-wider cursor-pointer"
//                   onClick={() => requestSort("room")}
//                 >
//                   Room Number {getSortIcon("room")}
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-extrabold uppercase tracking-wider border-hidden rounded-r-md">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {sortedPatients.map((patient) => (
//                 <tr key={patient.patientId}>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.patientId}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.patientName}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.doctorName}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.disease}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     {patient.room}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     <div className="p-4 flex flex-row gap-2 justify-around">
//                       <button
//                         className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         style={{ minWidth: "65px", minHeight: "35px" }}
//                         onClick={() => handleEdit(patient)}
//                       >
//                         <div className="m-2 mr-4 ml-4 font-bold">Edit</div>
//                       </button>
//                       <button
//                         className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                         style={{ minWidth: "60px", minHeight: "35px" }}
//                         onClick={() => handleDelete(patient.patientId)}
//                       >
//                         <div className="m-2 mr-4 ml-4 font-bold">Delete</div>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
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
//                 <label className="block text-gray-700">Disease</label>
//                 <input
//                   type="text"
//                   name="disease"
//                   value={formData.disease}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Room</label>
//                 <input
//                   type="text"
//                   name="room"
//                   value={formData.room}
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
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { useTable, useSortBy } from "react-table";

function PatientDetailsTable() {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    doctorName: "",
    disease: "",
    room: "",
  });

  useEffect(() => {
    async function fetchPatients() {
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
    }

    fetchPatients();
  }, []);

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
      disease: patient.disease,
      room: patient.room,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/patients/${formData.patientId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.patientId === formData.patientId ? formData : patient
          )
        );
        setEditPatient(null);
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
        Header: "Disease",
        accessor: "disease",
      },
      {
        Header: "Room Number",
        accessor: "room",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <div className="flex gap-2">
              <button
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ minWidth: "65px", display: "flex", justifyContent: "center", alignItems: "center" }}
                onClick={() => handleEdit(row.original)}
              >
                <div className="font-bold">Edit</div>
              </button>
              <button
                className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                style={{ minWidth: "60px", display: "flex", justifyContent: "center", alignItems: "center" }}
                onClick={() => handleDelete(row.original.patientId)}
              >
                <div className="font-bold">Delete</div>
              </button>
            </div>
          </div>
        ),
        
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    ],
    []
  );

  const data = useMemo(() => patients, [patients]);

  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-0">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Patient Details</h2>
      <div className="overflow-x-auto">
        {patients.length > 0 ? (
          <table
            {...getTableProps()}
            className="w-full shadow-xl rounded-md border-collapse m-auto"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-5 bg-gray-600 text-white text-left first-of-type:rounded-l-lg last-of-type:rounded-r-lg"
                    >
                      {column.render("Header")}
                      <span>
                        {/* {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown className="inline" />
                          ) : (
                            <FaSortUp className="inline" />
                          )
                        ) : (
                          ""
                        )} */}
                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
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
              <div className="mb-4">
                <label className="block text-gray-700">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Doctor Name</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Disease</label>
                <input
                  type="text"
                  name="disease"
                  value={formData.disease}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Room</label>
                <input
                  type="text"
                  name="room"
                  value={formData.room}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-around">
                <button
                  type="button"
                  onClick={() => setEditPatient(null)}
                  className="mr-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
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
