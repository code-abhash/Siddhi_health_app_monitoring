
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import Disease from './components/Disease/Disease';
import Signup from './components/auth/Signup';
import Home from './components/Home/Home';
import Patients from './components/Patients/Patients';
import PRecords from './components/PRecords/PRecords';
import Dataentry from './components/VitalsEntry/Dataentry';
// import PatientForm from './components/VitalsEntry/PatientRecords';
import Login from './components/auth/Login';
import { AuthProvider } from "../Auth_contxt/Authcontext";
import PrivateRoute from "../utils/PrivateRoute";
import AddPatientForm from "./components/Patient-Records/AddNewPatient";
import PatientDetailsTable from "./components/Patient-Records/PatientRecordsData";
import PatientRecordsTab from "./components/Patient-Records/PatientRecordsTab";
import Disease_summary from "./components/Disease-Summary/Disease-summary";
import Disease_page from "./components/Disease-Summary/Disease_page";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/patients" 
            element={
              <PrivateRoute>
                <Patients />
              </PrivateRoute>
            }
          />
          <Route 
            path="/disease_summary/:patientId" 
            element={
              <PrivateRoute>
                <Disease_page/>
              </PrivateRoute>
            }
          />
          <Route 
            path="/PRecords" 
            element={
              <PrivateRoute>
                <PatientRecordsTab />
              </PrivateRoute>
            }
          />
          <Route 
            path="/patientvitals" 
            element={
              <PrivateRoute>
                <Dataentry />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
