// src/components/Header.jsx
// import React from 'react';
// import patient from "./img/patient.png";

// const Header = () => {
//   return (
//     <div className="bg-blue-400 p-4 flex justify-between items-center">
//       <h1 className="text-white text-lg">#PATIENT_ID</h1>
//       <button className="bg-green-500 rounded-full p-2">
//         {/* Add an icon here */}
//         <img
//               src={patient}
//               alt="Patient Icon"
//               className="object-cover w-14 h-auto border border-transparent rounded-lg"
//             ></img>
//       </button>
//     </div>
//   );
// };

// export default Header;

// import React from 'react';
// import patientIcon from "./img/patient.png";

// const Header = ({ patientId }) => {
//   return (
//     <header className="bg-gray-600 p-5 flex justify-between items-center">
//       <h1 className="text-white text-2xl font-semibold">#{patientId}</h1>
//       <button className="bg-gray-400 rounded-full p-3">
//         <img
//           src={patientIcon}
//           alt="Edit Patient"
//           title="Edit Patient"
//           className="object-cover w-10 h-auto border border-transparent rounded-lg"
//         />
//       </button>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { useState } from 'react';
import patientIcon from "./img/patient.png";
import Panel from '../Home/Panel';

const Header = ({ patientId }) => {
  

  
  return (
    <header className="bg-gray-600 font-roboto p-5 flex justify-between items-center">
      <div><h1 className="text-white text-2xl font-semibold">#{patientId}</h1></div>
      <div><button className="bg-gray-400 rounded-full p-3">
        <img
          src={patientIcon}
          alt="Edit Patient"
          title="Edit Patient"
          className="object-cover w-10 h-auto border border-transparent rounded-lg"
        />
      </button></div>
    </header>
  );
}

export default Header;