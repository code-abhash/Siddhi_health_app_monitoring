

import React, { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faEnvelope,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "./img/logo.png";
import img2 from "./img/img3.jpg";
import "./Home.css";
import AuthContext from "../../../Auth_contxt/Authcontext";

const UserDetailsPopup = ({ user, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Add your password change logic here
    console.log("Password changed successfully!");
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-80 p-4 bg-white border rounded-lg shadow-lg z-30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">User Details</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          <FontAwesomeIcon icon={faXmark} className="h-6" />
        </button>
      </div>
      <div className="mb-4 text-center">
        <img
          src={img2}
          alt="User"
          className="object-cover w-24 h-24 border border-transparent rounded-lg mx-auto"
        />
      </div>
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">{user.username}</p>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">
          Patients under your Supervision: {user.patientsCount}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleChangePassword}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef(null);

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
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
    navigate("/login");
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
        <div
          id="nav-menu"
          className="hidden lg:flex gap-10 justify-between items-center"
        >
          <NavLink
            to="/"
            className="pl-5 pr-5 font-bold hover:underline rounded"
          >
            Home
          </NavLink>
          <NavLink
            to="/patients"
            className="pl-5 pr-5 font-bold hover:underline rounded"
          >
            Patients
          </NavLink>
          <NavLink
            to="/PRecords"
            className="pl-5 pr-5 font-bold hover:underline rounded"
          >
            Patient Records
          </NavLink>
          <NavLink
            to="/nurse"
            className="pl-5 pr-5 font-bold hover:underline rounded"
          >
            Data Entry
          </NavLink>
          {/* <NavLink
            to="/patientform"
            className="pl-5 pr-5 font-bold hover:underline rounded"
          >
            Patient Details
          </NavLink> */}
        </div>
        <div
          id="nav-menu"
          className="hidden lg:flex justify-between items-center"
        >
          <NavLink
            to="/"
            className="pl-5 pr-5 font-bold hover:text-gray-900 active:text-gray-950"
          >
            <FontAwesomeIcon icon={faBell} />
          </NavLink>
          <NavLink
            to="/"
            className="pl-5 pr-5 font-bold hover:text-gray-900 active:text-gray-950"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </NavLink>
          {user && (
            <div className="relative" ref={userRef}>
              <button
                onClick={togglePopup}
                className="hidden lg:flex gap-3 justify-between items-center"
              >
                <img
                  src={img2}
                  alt="Doctor"
                  className="object-cover w-12 h-auto border border-transparent rounded-lg"
                ></img>
                <div>
                  <span className="pl-4 font-medium ">{user.username}</span>
                </div>
              </button>
              {isPopupOpen && (
                <div className="absolute right-0 mt-2">
                  <UserDetailsPopup user={user} onClose={togglePopup} />
                </div>
              )}
            </div>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="pl-5 pr-5 font-bold hover:underline rounded"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="pl-5 pr-5 font-bold hover:underline rounded"
            >
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
            {user && (
              <div className="flex items-center">
                <img
                  src={img2}
                  alt="User"
                  className="object-cover w-10 h-10 border border-transparent rounded-lg"
                />
                <div className="pl-2">
                  <p className="text-lg font-semibold">{user.username}</p>
                </div>
              </div>
            )}
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
            <Link
              to="/"
              className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/patients"
              className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
            >
              Patients
            </Link>
            <Link
              to="/PRecords"
              className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
            >
              Patient Records
            </Link>
            <Link
              to="/nurse"
              className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
            >
              Data Entry
            </Link>
            {/* <Link
              to="/patientform"
              className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
            >
              Patient Details
            </Link> */}
            {user ? (
              <button
                onClick={handleLogout}
                className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="font-medium m-3 p-3 hover:bg-yellow-300 block rounded-lg"
              >
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
