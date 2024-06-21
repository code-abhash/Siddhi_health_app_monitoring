// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faBars,
// //   faBell,
// //   faEnvelope,
// //   faXmark,
// // } from "@fortawesome/free-solid-svg-icons";
// // import { Link } from "react-router-dom";
// // import img1 from "./img/logo.png";
// // import img2 from "./img/img3.jpg";
// // import React, { useState, useEffect } from "react";
// // import './Home.css';
// // import { NavLink } from "react-router-dom";

// // const Navbar = () => {
// //   const [isMenuOpen, setMenuOpen] = useState(false);

// //   const handleMenu = () => {
// //     setMenuOpen(!isMenuOpen);
// //   };

// //   useEffect(() => {
// //     const handleResize = () => {
// //       // If screen size crosses the threshold for big screen and menu is open, close it
// //       if (window.innerWidth > 768 && isMenuOpen) {
// //         setMenuOpen(false);
// //       }
// //     };

// //     // Add event listener for resize events
// //     window.addEventListener("resize", handleResize);

// //     // Remove event listener when component unmounts
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, [isMenuOpen]);

// //   return (
// //     <>
// //         <nav className="p-2 flex justify-between items-center nav_home">
// //           <NavLink to="/" id="logo">
// //             <img
// //               src={img1}
// //               alt="Logo"
// //               className="object-cover w-auto h-10 border border-transparent rounded-lg"
// //             ></img>
// //           </NavLink>
// //           <div
// //             id="nav-menu"
// //             className="hidden lg:flex gap-10 justify-between items-center"
// //           >
// //             <NavLink
// //               to="/home"
// //               className="pl-5 pr-5 font-bold hover:underline rounded"
// //             >
// //               Home
// //             </NavLink>
// //             <NavLink

// //               to="/patients"
// //               className="pl-5 pr-5 font-bold hover:underline rounded"
// //               >
// //               Patients
// //             </NavLink>
// //             <NavLink

// //               to="/PRecords"
// //               className="pl-5 pr-5 font-bold hover:underline rounded"
// //             >
// //               Patient Records
// //             </NavLink>
// //             <NavLink
// //               to="/nurse"
// //              className="pl-5 pr-5 font-bold hover:underline rounded"
// //             >
// //               Data Entry
// //             </NavLink>
// //             <NavLink
// //               to="/patientform"
// //               className="pl-5 pr-5 font-bold hover:underline rounded"
// //             >
// //               Patient-Details
// //             </NavLink>
// //           </div>
// //           <div
// //             id="nav-menu"
// //             className="hidden lg:flex justify-between items-center "
// //           >
// //             <NavLink
// //               to="/home"
// //               className="pl-5 pr-5 font-bold hover:text-gray-900  active:text-gray-950"
// //             >
// //               <FontAwesomeIcon icon={faBell} />
// //             </NavLink>
// //             <NavLink
// //               to="/home"
// //               className="pl-5 pr-5 font-bold hover:text-gray-900  active:text-gray-950"
// //             >
// //               <FontAwesomeIcon icon={faEnvelope} />
// //             </NavLink>
// //             <NavLink
// //             to="/"
// //             id="logo"
// //             className="hidden lg:flex gap-5 justify-between items-center"
// //           >
// //             <img
// //               src={img2}
// //               alt="Doctor"
// //               className="object-cover w-12 h-auto border border-transparent rounded-lg"
// //             ></img>
// //             <span className="pl-4 font-medium ">User</span>
// //           </NavLink>
// //             <NavLink
// //               to="/login"
// //               className="pl-5 pr-5 font-bold hover:underline rounded"
// //             >
// //               Logout
// //             </NavLink>
// //           </div>
// //           <button className="p-2 lg:hidden" onClick={handleMenu}>
// //             <FontAwesomeIcon icon={faBars} className="text-gray-800 h-6" />
// //           </button>
// //           <div
// //             id="nav-dilogue"
// //             className={`fixed bg-gray-200 h-5/6 z-20 inset-0 p-3 ${
// //               isMenuOpen ? "" : "hidden"
// //             }`}
// //           >
// //             <div id="nav-bar" className="flex justify-between">
// //               <img
// //                 src={img1}
// //                 alt="Logo"
// //                 className="object-fill w-auto h-10 border border-transparent rounded-lg"
// //               ></img>
// //               <button className="p-2 lg:hidden" onClick={handleMenu}>
// //                 <FontAwesomeIcon icon={faXmark} className="text-gray-800 h-6" />
// //               </button>
// //             </div>
// //             <div className="mt-6">
// //               <Link
// //                 to="/home"
// //                 className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg "
// //               >
// //                 Home
// //               </Link>
// //               <Link
// //                 to="/patients"
// //                 className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg "
// //               >
// //                 Patients
// //               </Link>
// //               <Link
// //                 to="/PRecords"
// //                 className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg "
// //               >
// //                 Patient Records
// //               </Link>
// //               <Link
// //                 to="/nurse"
// //                 className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg "
// //               >
// //                 Data Entry
// //               </Link>
// //               <Link
// //                 to="/login"
// //                 className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg "
// //               >
// //                 Logout
// //               </Link>
// //             </div>
// //           </div>
// //         </nav>
// //     </>
// //   );
// // };

// // export default Navbar;


// import React, { useState, useEffect, useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faBell,
//   faEnvelope,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import img1 from "./img/logo.png";
// import img2 from "./img/img3.jpg";
// import './Home.css';
// import AuthContext from "../../../Auth_contxt/Authcontext";

// const Navbar = () => {
//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const { user, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleMenu = () => {
//     setMenuOpen(!isMenuOpen);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768 && isMenuOpen) {
//         setMenuOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isMenuOpen]);

//   const handleLogout = () => {
//     logoutUser();
//     navigate('/login');
//   };

//   return (
//     <>
//       <nav className="p-2 flex justify-between items-center nav_home">
//         <NavLink to="/" id="logo">
//           <img
//             src={img1}
//             alt="Logo"
//             className="object-cover w-auto h-10 border border-transparent rounded-lg"
//           ></img>
//         </NavLink>
//         <div
//           id="nav-menu"
//           className="hidden lg:flex gap-10 justify-between items-center"
//         >
//           <NavLink to="/" className="pl-5 pr-5 font-bold hover:underline rounded">
//             Home
//           </NavLink>
//           <NavLink to="/patients" className="pl-5 pr-5 font-bold hover:underline rounded">
//             Patients
//           </NavLink>
//           <NavLink to="/PRecords" className="pl-5 pr-5 font-bold hover:underline rounded">
//             Patient Records
//           </NavLink>
//           <NavLink to="/nurse" className="pl-5 pr-5 font-bold hover:underline rounded">
//             Data Entry
//           </NavLink>
//           <NavLink to="/patientform" className="pl-5 pr-5 font-bold hover:underline rounded">
//             Patient-Details
//           </NavLink>
//         </div>
//         <div
//           id="nav-menu"
//           className="hidden lg:flex justify-between items-center"
//         >
//           <NavLink to="/" className="pl-5 pr-5 font-bold hover:text-gray-900 active:text-gray-950">
//             <FontAwesomeIcon icon={faBell} />
//           </NavLink>
//           <NavLink to="/" className="pl-5 pr-5 font-bold hover:text-gray-900 active:text-gray-950">
//             <FontAwesomeIcon icon={faEnvelope} />
//           </NavLink>
//           <NavLink to="/" id="logo" className="hidden lg:flex gap-5 justify-between items-center">
//             <img
//               src={img2}
//               alt="Doctor"
//               className="object-cover w-12 h-auto border border-transparent rounded-lg"
//             ></img>
//             <span className="pl-4 font-medium ">User</span>
//           </NavLink>
//           {user ? (
//             <button
//               onClick={handleLogout}
//               className="pl-5 pr-5 font-bold hover:underline rounded"
//             >
//               Logout
//             </button>
//           ) : (
//             <NavLink to="/login" className="pl-5 pr-5 font-bold hover:underline rounded">
//               Login
//             </NavLink>
//           )}
//         </div>
//         <button className="p-2 lg:hidden" onClick={handleMenu}>
//           <FontAwesomeIcon icon={faBars} className="text-gray-800 h-6" />
//         </button>
//         <div
//           id="nav-dilogue"
//           className={`fixed bg-gray-200 h-5/6 z-20 inset-0 p-3 ${
//             isMenuOpen ? "" : "hidden"
//           }`}
//         >
//           <div id="nav-bar" className="flex justify-between">
//             <img
//               src={img1}
//               alt="Logo"
//               className="object-fill w-auto h-10 border border-transparent rounded-lg"
//             ></img>
//             <button className="p-2 lg:hidden" onClick={handleMenu}>
//               <FontAwesomeIcon icon={faXmark} className="text-gray-800 h-6" />
//             </button>
//           </div>
//           <div className="mt-6">
//             <Link to="/" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
//               Home
//             </Link>
//             <Link to="/patients" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
//               Patients
//             </Link>
//             <Link to="/PRecords" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
//               Patient Records
//             </Link>
//             <Link to="/nurse" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
//               Data Entry
//             </Link>
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link to="/login" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "./img/logo.png";
import img2 from "./img/img3.jpg";
import './Home.css';
import AuthContext from "../../../Auth_contxt/Authcontext";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <>
      <nav className="p-2 flex justify-between items-center nav_home">
        <NavLink to="/" id="logo">
          <img
            src={img1}
            alt="Logo"
            className="object-cover w-auto h-10 border border-transparent rounded-lg"
          ></img>
        </NavLink>
        <div id="nav-menu" className="hidden lg:flex gap-10 justify-between items-center">
          <NavLink to="/" className="pl-5 pr-5 font-bold hover:underline rounded">
            Home
          </NavLink>
          <NavLink to="/patients" className="pl-5 pr-5 font-bold hover:underline rounded">
            Patients
          </NavLink>
          <NavLink to="/PRecords" className="pl-5 pr-5 font-bold hover:underline rounded">
            Patient Records
          </NavLink>
          <NavLink to="/nurse" className="pl-5 pr-5 font-bold hover:underline rounded">
            Data Entry
          </NavLink>
          <NavLink to="/patientform" className="pl-5 pr-5 font-bold hover:underline rounded">
            Patient-Details
          </NavLink>
        </div>
        <div id="nav-menu" className="hidden lg:flex justify-between items-center">
          <NavLink to="/" className="pl-5 pr-5 font-bold hover:text-gray-900 active:text-gray-950">
            <FontAwesomeIcon icon={faBell} />
          </NavLink>
          <NavLink to="/" className="pl-5 pr-5 font-bold hover:text-gray-900 active:text-gray-950">
            <FontAwesomeIcon icon={faEnvelope} />
          </NavLink>
          {user && (
            <NavLink to="/" id="logo" className="hidden lg:flex gap-3 justify-between items-center">
              <img
                src={img2}
                alt="Doctor"
                className="object-cover w-12 h-auto border border-transparent rounded-lg"
              ></img>
              <div><span className="pl-4 font-medium ">{user.username}</span></div>
            </NavLink>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="pl-5 pr-5 font-bold hover:underline rounded"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="pl-5 pr-5 font-bold hover:underline rounded">
              Login
            </NavLink>
          )}
        </div>
        <button className="p-2 lg:hidden" onClick={handleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-gray-800 h-6" />
        </button>
        <div
          id="nav-dilogue"
          className={`fixed bg-gray-200 h-5/6 z-20 inset-0 p-3 ${
            isMenuOpen ? "" : "hidden"
          }`}
        >
          <div id="nav-bar" className="flex justify-between">
            <img
              src={img1}
              alt="Logo"
              className="object-fill w-auto h-10 border border-transparent rounded-lg"
            ></img>
            <button className="p-2 lg:hidden" onClick={handleMenu}>
              <FontAwesomeIcon icon={faXmark} className="text-gray-800 h-6" />
            </button>
          </div>
          <div className="mt-6">
            <Link to="/" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
              Home
            </Link>
            <Link to="/patients" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
              Patients
            </Link>
            <Link to="/PRecords" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
              Patient Records
            </Link>
            <Link to="/nurse" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
              Data Entry
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
