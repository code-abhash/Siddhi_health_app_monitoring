
import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import Infobutton from "../Infobutton/Infobutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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

  // State for search term and filtered patients
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);

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
      setFilteredPatients(data); // Initialize filtered patients with all patients
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
        setFilteredPatients((prevPatients) =>
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

  // Memoized data and table instance
  const data = useMemo(() => filteredPatients, [filteredPatients]);
  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filteredData = patients.filter(
      (patient) =>
        patient.patientId.includes(searchValue)||
        patient.patientName.toLowerCase().includes(searchValue) ||
        patient.doctorName.toLowerCase().includes(searchValue) ||
        patient.ward.toLowerCase().includes(searchValue) ||
        patient.bed.toLowerCase().includes(searchValue)
    );
    setFilteredPatients(filteredData);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-0">
      <div className="flex justify-between">
      <h1 className="text-lg font-bold text-gray-900 mb-2">
        Patient Details
        <Infobutton
          message={`This table displays the existing patient records. Clicking on a patient’s ID will redirect you to a detailed summary of their medical history and current diagnoses.`}
        />
      </h1>
      
       <div className="flex justify-end mb-4 relative">
        <input
          type="text"
          placeholder="Search Patients "
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-10 sm:text-sm"
          style={{ paddingRight: "2rem" }} // Ensure input text doesn't overlap icon
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-3 text-gray-400"
        />
      </div>
      </div>
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
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Edit Patient
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="patientName" className="font-medium">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="doctorName" className="font-medium">
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="ward" className="font-medium">
                  Ward
                </label>
                <input
                  type="text"
                  id="ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bed" className="font-medium">
                  Bed Number
                </label>
                <input
                  type="text"
                  id="bed"
                  name="bed"
                  value={formData.bed}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditPatient(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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
