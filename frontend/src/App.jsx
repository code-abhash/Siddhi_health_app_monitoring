
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from './components/auth/Signup';
import Home from './components/Home/Home';
import Patients from './components/Patients/Patients';
import Dataentry from './components/VitalsEntry/Dataentry';
import Login from './components/auth/Login';
import { AuthProvider } from "../Auth_contxt/Authcontext";
import PrivateRoute from "../utils/PrivateRoute";
import PatientRecordsTab from "./components/Patient-Records/PatientRecordsTab";
import Disease_page from "./components/Disease-Summary/Disease_page";
import PasswordResetConfirm from "./components/auth/PasswordResetConfirm";
import PasswordResetRequest from "./components/auth/PasswordRequest";
import Profilespec from "./components/ProfileUser/ImageSpec"


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/password_reset" element={<PasswordResetRequest/>} />
          <Route path="/reset/:username/:token" element={<PasswordResetConfirm/>} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:username" element={<Profilespec />} />
          
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
