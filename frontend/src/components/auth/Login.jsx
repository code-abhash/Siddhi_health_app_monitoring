import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import img4 from "./img/logo.png";
import "./Auth.css";
import "./CustomSwal.css";
import AuthContext from "../../../Auth_contxt/Authcontext"; // Import AuthContext for authentication
import Swal from "sweetalert2"; // Import Swal for notifications

const Login = () => {
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { loginUser } = useContext(AuthContext); // Destructure loginUser function from AuthContext
  const location = useLocation(); // Get current location to check for messages in state
  const message = location.state?.message; // Retrieve message from location state

  useEffect(() => {
    // Display alert if message is present in location state
    if (message) {
      Swal.fire({
        icon: 'warning',
        title: 'Alert',
        text: message,
        position: 'top-right',
        confirmButtonText: 'OK',
        timer: 3000,
        customClass: {
          popup: 'my-swal' // Custom CSS class for SweetAlert2 popup
        }
      });
    }
  }, [message]); // Trigger effect when message changes

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (username.length > 0) { // Ensure username is not empty
      loginUser(username, password); // Call loginUser function with username and password
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle showPassword state to reveal/hide password
  };

  return (
    <div className="flex flex-col bgimg">
      <center>
        <img
          src={img4}
          alt="logo"
          className="w-auto h-10 m-4 border-2 rounded"
        />
      </center>
      <div className="flex flex-col justify-center items-center backdrop-filter backdrop-blur-xl border-opacity-30 shadow-lg m-auto p-5 w-full sm:w-4/5 md:w-4/6 lg:w-2/5 border-2 rounded-3xl">
        <div className="font-roboto font-bold text-4xl underline mb-5">Login</div>
        
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex flex-col">
              <label htmlFor="use_id" className="text-lg font-bold text-gray-900 mb-1">Username</label>
              <div className="flex items-center border-2 border-transparent bg-slate-100 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg p-1">
                <input
                  id="use_id"
                  type="text"
                  name="username"
                  placeholder="Enter Your Username"
                  className="placeholder-black placeholder:font-medium placeholder:text-sm font-medium text-md w-full bg-transparent bg-opacity-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update username state on change
                />
                <FontAwesomeIcon icon={faUser} className="text-gray-800" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="pass_id" className="text-lg font-bold text-gray-900">Password</label>
              <div className="flex items-center border-2 border-transparent bg-slate-100 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg p-1">
                <input
                  id="pass_id"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  className="placeholder-black placeholder:font-medium placeholder:text-sm font-medium text-md w-full bg-transparent bg-opacity-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={toggleShowPassword} // Toggle password visibility on click
                  className="text-gray-800 cursor-pointer"
                />
                <FontAwesomeIcon icon={faLock} className="text-gray-800 ml-2" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-stone-950 font-bold">
                <input type="checkbox" value="1" /> Remember me
              </div>
              <Link to="/password_reset" className="text-red-600 font-semibold">
                Forgot Password?
              </Link>
            </div>
            <button
              className="bg-blue-900 rounded-lg font-black h-10 text-slate-200"
              type="submit"
            >
              Login
            </button>
            <div className="flex flex-row gap-2 justify-between mb-12">
              <p className="text-stone-950 font-bold">Don't have an account?</p>
              <Link to="/register" className="font-semibold">
                Register Here!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;