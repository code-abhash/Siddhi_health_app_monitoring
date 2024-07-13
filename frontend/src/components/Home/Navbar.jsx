import React, { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "./img/logo.png";
import img2 from "./img/img3.jpg";
import "./Home.css";
import AuthContext from "../../../Auth_contxt/Authcontext";
import axios from "axios"; // Import axios for API calls
import AxiosInstance from "../Axios/Axios";

// Component for displaying user details in a popup
const UserDetailsPopup = ({ user, onClose }) => {
  const [profileImage, setProfileImage] = useState(null);

  // Fetch profile image when user changes
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await AxiosInstance.get(
          `profiles/${user.username}/`
        );
        setProfileImage(response.data.image);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    if (user) {
      fetchProfileImage();
    }
  }, [user]);

  // Handle user logout
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  const baseUrl =
      import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_BASE_URL_PROD_IMG
      : import.meta.env.VITE_API_BASE_URL_LOCAL_IMG;

  return (
    <div className="absolute right-0 mt-2 w-96 p-6 bg-white border rounded-lg shadow-lg z-30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">User Details</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 transition duration-300"
        >
          <FontAwesomeIcon icon={faXmark} className="h-6" />
        </button>
      </div>

      <div className="mb-6 text-center">
        <img
          src={profileImage ? `${baseUrl}${profileImage}` : img2}
          alt="User"
          className="object-cover w-32 h-32 border-4 border-gray-200 rounded-full mx-auto shadow-lg"
        />
      </div>
      <div className="text-center mb-6">
        <Link
          to={`/profile/${user.username}`}
          className="text-blue-600 hover:underline text-lg font-medium"
        >
          {user.username}
        </Link>
        <p className="text-gray-500 mt-2">{user.email}</p>
      </div>
      <div className="text-center">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Navbar component
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null); // State to store profile image URL

  // Fetch profile image when user changes
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await AxiosInstance.get(
          `profiles/${user.username}/`
        );
        setProfileImage(response.data.image);
      } catch (error) {
        console.error("Error fetching profile image:", error);
        // Handle error fetching profile image
      }
    };

    if (user) {
      fetchProfileImage();
    }
  }, [user]);

  // Toggle the menu open/close state
  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Toggle the popup open/close state
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const baseUrl =
      import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_API_BASE_URL_PROD_IMG
      : import.meta.env.VITE_API_BASE_URL_LOCAL_IMG;

  return (
    <>
      <nav className="p-4 flex justify-between items-center bg-white shadow-md">
        <NavLink to="/" id="logo" className="flex items-center">
          <img
            src={img1}
            alt="Logo"
            className="object-cover w-auto h-10 border border-transparent rounded-lg"
          />
          <span className="ml-3 text-xl font-bold text-gray-800">
            Health Care Monitor
          </span>
        </NavLink>
        <div
          id="nav-menu"
          className="hidden lg:flex gap-10 justify-between items-center"
        >
          <NavLink
            to="/"
            className="px-5 py-2 font-semibold text-gray-700 hover:text-gray-900 hover:underline rounded"
          >
            Home
          </NavLink>
          <NavLink
            to="/patients"
            className="px-5 py-2 font-semibold text-gray-700 hover:text-gray-900 hover:underline rounded"
          >
            Patients Analysis
          </NavLink>
          <NavLink
            to="/PRecords"
            className="px-5 py-2 font-semibold text-gray-700 hover:text-gray-900 hover:underline rounded"
          >
            Patient Records
          </NavLink>
          <NavLink
            to="/patientvitals"
            className="px-5 py-2 font-semibold text-gray-700 hover:text-gray-900 hover:underline rounded"
          >
            Patient Vitals
          </NavLink>
        </div>
        <div
          id="nav-menu"
          className="hidden lg:flex justify-between items-center gap-5"
        >
          {user && (
            <div className="relative" ref={userRef}>
              <button onClick={togglePopup} className="flex items-center gap-3">
                <img
                  src={
                    profileImage ? `${baseUrl}${profileImage}` : img2
                  } // Use profile image or default image
                  alt="Doctor"
                  className="object-cover w-12 h-12 border border-transparent rounded-full"
                />
                <div>
                  <Link
                    to={`/profile/${user.username}`}
                    className="text-gray-800 hover:underline font-medium"
                  >
                    {user.username}
                  </Link>
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
              className="px-5 py-2 font-semibold text-gray-700 hover:underline rounded"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-5 py-2 font-semibold text-gray-700 hover:underline rounded"
            >
              Login
            </NavLink>
          )}
        </div>
        <button className="p-2 lg:hidden" onClick={handleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-gray-800 h-6" />
        </button>
        <div
          id="nav-dialogue"
          className={`fixed bg-white h-full z-20 inset-0 p-6 ${
            isMenuOpen ? "" : "hidden"
          }`}
        >
          <div id="nav-bar" className="flex justify-between items-center">
            {user && (
              <div className="flex items-center">
                <img
                  src={
                    profileImage ? `${baseUrl}${profileImage}` : img2
                  } // Use profile image or default image
                  alt="User"
                  className="object-cover w-10 h-10 border border-transparent rounded-full"
                />
                <div className="pl-2">
                  <Link
                    to={`/profile/${user.username}`}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    {user.username}
                  </Link>
                </div>
              </div>
            )}
            <img
              src={img1}
              alt="Logo"
              className="object-fill w-auto h-10 border border-transparent rounded-lg"
            />
            <button className="p-2 lg:hidden" onClick={handleMenu}>
              <FontAwesomeIcon icon={faXmark} className="text-gray-800 h-6" />
            </button>
          </div>
          <div className="mt-6 space-y-3">
            <Link
              to="/"
              className="block font-medium px-3 py-2 hover:bg-yellow-300 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/patients"
              className="block font-medium px-3 py-2 hover:bg-yellow-300 rounded-lg"
            >
              Patients Analysis
            </Link>
            <Link
              to="/PRecords"
              className="block font-medium px-3 py-2 hover:bg-yellow-300 rounded-lg"
            >
              Patient Records
            </Link>
            <Link
              to="/patientvitals"
              className="block font-medium px-3 py-2 hover:bg-yellow-300 rounded-lg"
            >
              Patient Vitals
            </Link>
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