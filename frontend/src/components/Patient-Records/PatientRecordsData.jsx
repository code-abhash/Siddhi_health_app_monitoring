import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import Infobutton from "../Infobutton/Infobutton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import AxiosInstance from "../Axios/Axios";

function PatientDetailsTable() {
  // State variables for managing patient data, edit mode, and form data
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
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  // Function to fetch patients data from the API
  const fetchPatients = async () => {
    
    try {
      const response = await AxiosInstance.get(`/patientslist/`);
      setPatients(response.data);
      setFilteredPatients(response.data); // Initialize filtered patients with all patients
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  
  const handleDelete = async (patientId) => {
    try {
      const response = await AxiosInstance.delete(`/patients/${patientId}/`);
      if (response.status === 204) {
        // Update patients and filtered patients after deletion
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

  // Function to set edit mode and populate form data for editing
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

  // Function to handle input change in the edit form
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
      const response = await AxiosInstance.put(
        `/patients/${formData.patientId}/`,
        dataToSubmit
      );
      if (response.status === 200) {
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

  // Columns configuration for the react-table
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
          <div className="flex flex-row p-2 justify-between">
            <div className="flex justify-around gap-4">
              {/* Edit button */}
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
              {/* Delete button */}
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

  // Destructuring table instance for easier usage
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  // Function to handle search input change and filter patients
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase(); // Convert search value to lowercase
    setSearchTerm(searchValue); // Update search term state
  
    // Filter patients based on search term
    const filteredData = patients.filter((patient) =>
      Object.values(patient).some(
        (value) =>
          value &&
          typeof value === "string" && // Check if value is a string
          value.toLowerCase().includes(searchValue) // Convert value to lowercase and check if it includes search term
      )
    );
  
    setFilteredPatients(filteredData); // Update filtered patients state
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
        <div className="relative">
  <input
    type="text"
    placeholder="Search Patients"
    value={searchTerm}
    onChange={handleSearchChange}
    className="px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pl-10 sm:text-sm
      sm:w-64 md:w-80 lg:w-96"
    style={{ width: '100%' }} // Ensures full width on smaller screens
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
                      className="p-5 bg-gray-600 text-white text-left first-of-type:rounded-l-lg last-of-type:rounded-r-lg"
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
                    onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Bed Number"
                    
                  />
                </div>
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
