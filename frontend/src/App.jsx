// // import Login from './components/auth/Login'
// // import Signup from './components/auth/Signup'
// // import Doctor from './components/Doctor'
// // import Home from './components/Home/Home'
// // import Dataentry from './components/VitalsEntry/Dataentry'
// // import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// // import Patients from './components/Patients/Patients'
// // import Settings from './components/Settings'
// // import Disease from './components/Disease/Disease'
// // import PRecords from './components/PRecords/PRecords'
// // import { AuthProvider } from '../Auth_contxt/Authcontext'

// // function App() {
  
// //   const router=createBrowserRouter([
// //     {
// //       path:'/register',
// //       element:<Signup/>
// //     },
// //     {
// //       path:'/',
// //       element:<Signup/>
// //     },
// //     {
// //       path:'/login',
// //       element:<Login/>
// //     },
// //     {
// //       path:'/doctor',
// //       element:<Doctor/>
// //     },
// //     {
// //       path:'/nurse',
// //       element:<Dataentry/>
// //     },
// //     {
// //       path:'/',
// //       element:<Home/>
// //     },
// //     {
// //       path:'/settings',
// //       element:<Settings/>
// //     },
// //     {
// //       path:'/patients',
// //       element:<Patients/>
// //     },
// //     {
// //       path:'/PRecords',
// //       element:<PRecords/>
// //     },
// //     {
// //       path:'/disease',
// //       element:<Disease/>
// //     }
// //   ])

// //   return (
// //     <>
// //     <RouterProvider router={router} />
// //     </>
// //   )
// // }

// // export default App

// import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
// import Login from './components/auth/Login';
// 
// import Doctor from './components/Doctor';
// import Home from './components/Home/Home';
// import Dataentry from './components/VitalsEntry/Dataentry';
// import Patients from './components/Patients/Patients';
// import Settings from './components/Settings';
// import Disease from './components/Disease/Disease';
// import PRecords from './components/PRecords/PRecords';
// import { AuthProvider } from '../Auth_contxt/Authcontext';
// import PatientForm from './components/VitalsEntry/PatientRecords';
// function App() {
//   return (<Router>
//     <AuthProvider> {/* Wrap your entire application with AuthProvider */}
      
//         <Routes>
//           <Route path="/register" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Navigate to="/home" />} />
//           {/* <Route path="/" element={<Login />} /> */}
//           <Route path="/doctor" element={<Doctor />} />
//           <Route path="/nurse" element={<Dataentry />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/patientform" element={<PatientForm />} />
//           <Route path="/patients" element={<Patients />} />
//           <Route path="/PRecords" element={<PRecords />} />
//           <Route path="/disease" element={<Disease />} />
//         </Routes>
     
//     </AuthProvider>
//     </Router>
//   );
// }

// export default App;

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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/disease" element={<Disease />} />
          <Route 
            path="/patients" 
            element={
              <PrivateRoute>
                <Patients />
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
            path="/nurse" 
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
