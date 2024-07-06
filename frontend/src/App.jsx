import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Importing necessary components from react-router-dom
import Signup from "./components/auth/Signup"; // Importing Signup component
import Home from "./components/Home/Home"; // Importing Home component
import Patients from "./components/Patients/Patients"; // Importing Patients component
import Dataentry from "./components/VitalsEntry/Dataentry"; // Importing Dataentry component
import Login from "./components/auth/Login"; // Importing Login component
import { AuthProvider } from "../Auth_contxt/Authcontext"; // Importing AuthProvider from Authcontext
import PrivateRoute from "../utils/PrivateRoute"; // Importing PrivateRoute component
import PatientRecordsTab from "./components/Patient-Records/PatientRecordsTab"; // Importing PatientRecordsTab component
import Disease_page from "./components/Disease-Summary/Disease_page"; // Importing Disease_page component
import PasswordResetConfirm from "./components/auth/PasswordResetConfirm"; // Importing PasswordResetConfirm component
import PasswordResetRequest from "./components/auth/PasswordRequest"; // Importing PasswordResetRequest component
import Profilespec from "./components/ProfileUser/ImageSpec"; // Importing Profilespec component

const App = () => {
  return (
    <Router>
      {" "}
      {/* Setting up the router component */}
      <AuthProvider>
        {" "}
        {/* Providing authentication context with AuthProvider */}
        <Routes>
          {" "}
          {/* Defining routes within the application */}
          {/* Public routes */}
          <Route
            path="/password_reset"
            element={<PasswordResetRequest />}
          />{" "}
          {/* Route for password reset request */}
          <Route
            path="/reset/:username/:token"
            element={<PasswordResetConfirm />}
          />{" "}
          {/* Route for password reset confirmation */}
          <Route path="/" element={<Navigate to="/home" />} />{" "}
          {/* Default route redirects to Home */}
          <Route path="/home" element={<Home />} />{" "}
          {/* Route for Home component */}
          <Route path="/register" element={<Signup />} />{" "}
          {/* Route for Signup component */}
          <Route path="/login" element={<Login />} />{" "}
          {/* Route for Login component */}
          <Route path="/profile/:username" element={<Profilespec />} />{" "}
          {/* Route for Profilespec component */}
          {/* Private routes (requires authentication) */}
          <Route
            path="/patients"
            element={
              <PrivateRoute>
                {" "}
                {/* Using PrivateRoute to protect access */}
                <Patients /> {/* Route for Patients component */}
              </PrivateRoute>
            }
          />
          <Route
            path="/disease_summary/:patientId"
            element={
              <PrivateRoute>
                {" "}
                {/* Using PrivateRoute to protect access */}
                <Disease_page /> {/* Route for Disease_page component */}
              </PrivateRoute>
            }
          />
          <Route
            path="/PRecords"
            element={
              <PrivateRoute>
                {" "}
                {/* Using PrivateRoute to protect access */}
                <PatientRecordsTab />{" "}
                {/* Route for PatientRecordsTab component */}
              </PrivateRoute>
            }
          />
          <Route
            path="/patientvitals"
            element={
              <PrivateRoute>
                {" "}
                {/* Using PrivateRoute to protect access */}
                <Dataentry /> {/* Route for Dataentry component */}
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
