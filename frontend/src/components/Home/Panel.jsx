// // import React from "react";
// // import { useState } from "react";
// // import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
// // import list from "./List.json";
// // import './Home.css'
// // import { useNavigate } from "react-router-dom";

// // const Panel = () => {
// //   const navigate = useNavigate();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [value, setValue] = useState("Choose Disease");

// //   const handleSelect = (disease) => {
// //     setValue(disease);
// //     setIsOpen(false);
// //   };


// //   return (
// //     <React.Fragment>
// //       <div className="flex flex-row justify-center  items-center mb-10 ">
// //         <button className="font-bold bg-black text-slate-300 px-6 py-4 text-xl tracking-wider hover:bg-slate-300 hover:text-black rounded-lg but_pan h-20 w-40 sm:h-14 sm:w-60" onClick={()=>{
// //           navigate('/disease')
// //         }}>
// //           Health Status
// //         </button>
// //         <div className="relative flex flex-col items-center m-2 rounded-lg">
// //           <button
// //             onClick={() => setIsOpen((prev) => !prev)}
// //             className="but_pan bg-black text-slate-300 font-bold flex items-center justify-between  px-6 py-4 text-xl tracking-wider hover:bg-slate-300 hover:text-black rounded-lg h-20 w-40 sm:h-14 sm:w-60"
// //           >
// //             {value}
// //             {!isOpen ? (
// //               <AiOutlineCaretDown className="h-8" />
// //             ) : (
// //               <AiOutlineCaretUp className="h-8" />
// //             )}
// //           </button>
// //           {isOpen && (
// //             <div className=" but_pan font-medium absolute bg-black text-slate-300 top-20 flex z-10 flex-col items-start rounded-lg p-4 w-full">
// //               {list.map((item, i) => (
// //                 <div 
// //                 key={i}
// //                 className="p-1 w-full hover:bg-slate-300 border-b-2  hover:text-black"
// //                 onClick={() => handleSelect(item.disease)}>
// //                   <h3>{item.disease}</h3>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </React.Fragment>
// //   );
// // };

// // export default Panel;

// // // import React from "react";
// // import { useState } from "react";
// // import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
// // import list from "./List.json";
// // import './Home.css'
// // import { useNavigate } from "react-router-dom";

// // const Panel = () => {
// //   const navigate = useNavigate();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [value, setValue] = useState("Choose Disease");

// //   const handleSelect = (disease) => {
// //     setValue(disease);
// //     setIsOpen(false);
// //   };


// //   return (
// //     <React.Fragment>
// //       <div className="flex flex-row justify-center  items-center mb-10 ">
// //         <button className="font-bold bg-black text-slate-300 px-6 py-4 text-xl tracking-wider hover:bg-slate-300 hover:text-black rounded-lg but_pan h-20 w-40 sm:h-14 sm:w-60" onClick={()=>{
// //           navigate('/disease')
// //         }}>
// //           Health Status
// //         </button>
// //         <div className="relative flex flex-col items-center m-2 rounded-lg">
// //           <button
// //             onClick={() => setIsOpen((prev) => !prev)}
// //             className="but_pan bg-black text-slate-300 font-bold flex items-center justify-between  px-6 py-4 text-xl tracking-wider hover:bg-slate-300 hover:text-black rounded-lg h-20 w-40 sm:h-14 sm:w-60"
// //           >
// //             {value}
// //             {!isOpen ? (
// //               <AiOutlineCaretDown className="h-8" />
// //             ) : (
// //               <AiOutlineCaretUp className="h-8" />
// //             )}
// //           </button>
// //           {isOpen && (
// //             <div className=" but_pan font-medium absolute bg-black text-slate-300 top-20 flex z-10 flex-col items-start rounded-lg p-4 w-full">
// //               {list.map((item, i) => (
// //                 <div 
// //                 key={i}
// //                 className="p-1 w-full hover:bg-slate-300 border-b-2  hover:text-black"
// //                 onClick={() => handleSelect(item.disease)}>
// //                   <h3>{item.disease}</h3>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </React.Fragment>
// //   );
// // };

// // export default Panel;

// import React from "react";
// import { useState, useEffect } from "react";
// import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
// import list from "./List.json";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Panel = ({ setPatientId, setPatientName, setDoctorName , onPatientSelect }) => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
 

//   useEffect(() => {
//     // Fetch patient data from the Django backend
//     axios.get('http://127.0.0.1:8000/api/patientdrop/')
//       .then(response => {
//         // Filter out duplicate patient IDs
//         const uniquePatients = filterUniquePatients(response.data);
//         setPatients(uniquePatients);
//       })
//       .catch(error => {
//         console.error('Error fetching patients:', error);
//       });
//   }, []);
//   const filterUniquePatients = (patients) => {
//     const uniqueIds = new Set();
//     return patients.filter(patient => {
//       if (uniqueIds.has(patient.patientId)) {
//         return false;
//       } else {
//         uniqueIds.add(patient.patientId);
//         return true;
//       }
//     });
//   };

//   const handleSelect = (patient) => {
//     setSelectedPatient(patient);
//     setIsOpen(false);
//     setPatientId(patient.patientId);
//     setPatientName(patient.patientName);
//     setDoctorName(patient.doctorName);
//     onPatientSelect(patient.patientId);
//   };

  
  

//   return (
//     <React.Fragment>
//       <div className="flex flex-col sm:flex-row  items-center space-y-4 sm:space-y-0 sm:space-x-4">
//         <div className="relative flex">
//           <button
//             onClick={() => setIsOpen((prev) => !prev)}
//             className="font-medium bg-slate-100 text-gray-900 flex items-center justify-between px-6 py-2 text-lg tracking-wider  hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
//           >
//             {selectedPatient ? `${selectedPatient.patientId} - ${selectedPatient.patientName}` : 'PatientId-Name'}
//             {!isOpen ? (
//               <AiOutlineCaretDown className="ml-2 h-5 w-5" />
//             ) : (
//               <AiOutlineCaretUp className="ml-2 h-5 w-5" />
//             )}
//           </button>
          
//           {isOpen && (
//             <div className=" absolute  bg-gray-400 text-gray-900 mt-12 py-2  rounded-lg shadow-lg z-10">
//               {patients.map((patient, i) => (
//                 <div
//                   key={i}
//                   className="px-6 py-1 hover:bg-gray-700 hover:cursor-pointer transition duration-300 ease-in-out"
//                   onClick={() => handleSelect(patient)}
//                 >
//                   {patient.patientId} - {patient.patientName}
//                 </div>
//               ))}
//             </div>
//           )}
         
//         </div></div>
//     </React.Fragment>
//   );
// };

// export default Panel;
// import React from "react";
// import { useState } from "react";
// import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
// import list from "./List.json";
// import './Home.css'
// import { useNavigate } from "react-router-dom";

// const Panel = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [value, setValue] = useState("Choose Disease");

//   const handleSelect = (disease) => {
//     setValue(disease);
//     setIsOpen(false);
//   };


//   return (
//     <React.Fragment>
//       <div className="flex flex-row justify-center  items-center mb-10 ">
//         <button className="font-bold bg-black text-slate-300 px-6 py-4 text-xl tracking-wider hover:bg-slate-300 hover:text-black rounded-lg but_pan h-20 w-40 sm:h-14 sm:w-60" onClick={()=>{
//           navigate('/disease')
//         }}>
//           Health Status
//         </button>
//         <div className="relative flex flex-col items-center m-2 rounded-lg">
//           <button
//             onClick={() => setIsOpen((prev) => !prev)}
//             className="but_pan bg-black text-slate-300 font-bold flex items-center justify-between  px-6 py-4 text-xl tracking-wider hover:bg-slate-300 hover:text-black rounded-lg h-20 w-40 sm:h-14 sm:w-60"
//           >
//             {value}
//             {!isOpen ? (
//               <AiOutlineCaretDown className="h-8" />
//             ) : (
//               <AiOutlineCaretUp className="h-8" />
//             )}
//           </button>
//           {isOpen && (
//             <div className=" but_pan font-medium absolute bg-black text-slate-300 top-20 flex z-10 flex-col items-start rounded-lg p-4 w-full">
//               {list.map((item, i) => (
//                 <div 
//                 key={i}
//                 className="p-1 w-full hover:bg-slate-300 border-b-2  hover:text-black"
//                 onClick={() => handleSelect(item.disease)}>
//                   <h3>{item.disease}</h3>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Panel;

import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import list from "./List.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Panel = ({ onPatientSelect }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Fetch patient data from the Django backend
    axios.get('http://127.0.0.1:8000/api/patientdrop/')
      .then(response => {
        // Filter out duplicate patient IDs
        const uniquePatients = filterUniquePatients(response.data);
        setPatients(uniquePatients);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);
  const filterUniquePatients = (patients) => {
    const uniqueIds = new Set();
    return patients.filter(patient => {
      if (uniqueIds.has(patient.patientId)) {
        return false;
      } else {
        uniqueIds.add(patient.patientId);
        return true;
      }
    });
  };

  const handleSelect = (patient) => {
    setSelectedPatient(patient);
    setIsOpen(false);
    onPatientSelect(patient);
  };

  
  

  return (
    <React.Fragment>
      <div className="flex font-roboto flex-col sm:flex-row  m-2 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* <button
          className="font-bold bg-blue-600 text-white px-6 py-2 text-lg tracking-wider hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out"
          onClick={() => navigate('/disease')}
        >
          Health Status
        </button> */}
        <div className="relative flex">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="font-medium bg-gray-200 text-gray-900 flex items-center justify-between px-6 py-2 text-lg tracking-wider  hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out"
          >
            {selectedPatient ? `${selectedPatient.patientId} - ${selectedPatient.patientName}` : 'PatientId-Name'}
            {!isOpen ? (
              <AiOutlineCaretDown className="ml-2 h-5 w-5" />
            ) : (
              <AiOutlineCaretUp className="ml-2 h-5 w-5" />
            )}
          </button>
          
          {isOpen && (
            <div className=" absolute  bg-gray-400 text-gray-900 mt-12 py-2  rounded-lg shadow-lg z-10">
              {patients.map((patient, i) => (
                <div
                  key={i}
                  className="px-6 py-1 hover:bg-gray-700 hover:cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => handleSelect(patient)}
                >
                  {patient.patientId} - {patient.patientName}
                </div>
              ))}
            </div>
          )}
         
        </div>
        {/* <div><button
          className=" bg-gray-400 text-gray-900 px-2 py-2 text-lg tracking-wider hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out ml-4"
        >
          Click here....
        </button></div> 
      </div> */}</div>
    </React.Fragment>
  );
};

export default Panel;
