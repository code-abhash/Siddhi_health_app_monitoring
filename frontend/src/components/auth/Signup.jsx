import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faSuitcaseMedical, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import img4 from "./img/logo.png";
import "./Auth.css";
import Swal from "sweetalert2";
import "./CustomSwal.css";
import AuthContext from "../../../Auth_contxt/Authcontext";

const Signup = () => {
  // State to manage form input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  // State to manage error messages
  const [error, setError] = useState("");

  // Extracting registerUser function from AuthContext
  const { registerUser } = useContext(AuthContext);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Regular expressions for validating email and password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9]).{9,}$/;

    // Validate inputs
    if (password !== password2) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
        position: 'top-right',
        timer: 3000,
        customClass: {
          popup: 'my-swal'
        }
      });
    } else if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 9 characters long and contain at least one number",
        position: 'top-right',
        timer: 3000,
        customClass: {
          popup: 'my-swal'
        }
      });
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        position: 'top-right',
        timer: 3000,
        customClass: {
          popup: 'my-swal'
        }
      });
    } else {
      // If all validations pass, reset error state and register user
      setError("");
      registerUser(email, username, role, password, password2);
    }
  };

  // Toggle password visibility for password field
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Toggle password visibility for confirm password field
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="flex flex-col bgimg">
      <center>
        <img
          src={img4}
          alt="logo"
          className="w-auto h-10 m-4 border-2 rounded"
        ></img>
        {/* Display error message if any */}
        {error && <div className="alert alert-danger font-bold text-red-700">{error}</div>}
      </center>
      <div className="flex flex-col justify-center items-center backdrop-filter backdrop-blur-xl border-opacity-30 shadow-lg m-auto p-5 w-full sm:w-4/5 md:w-4/6 lg:w-2/5 border-2 rounded-3xl">
        <div className="font-mono font-bold text-4xl underline mb-5">Sign up</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8 w-72">
          <div className="flex flex-col">
            <label htmlFor="username_id" className="text-lg font-bold text-gray-900">Username</label>
            <div className="flex items-center border-2 border-transparent bg-slate-100 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-md p-1">
              <input
                id="username_id"
                type="text"
                placeholder="Username"
                className="placeholder-black placeholder:font-medium placeholder:text-sm font-medium text-md w-full bg-transparent bg-opacity-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state on input change
              />
              <FontAwesomeIcon icon={faUser} className="text-gray-800" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password_id" className="text-lg font-bold text-gray-900">Password</label>
            <div className="flex items-center border-2 border-transparent bg-slate-100 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-md p-1">
              <input
                id="password_id"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="placeholder-black placeholder:font-medium placeholder:text-sm font-medium text-md w-full bg-transparent bg-opacity-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={toggleShowPassword}
                className="text-gray-800 cursor-pointer"
              />
              <FontAwesomeIcon icon={faLock} className="text-gray-800 ml-2" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="cpassword_id" className="text-lg font-bold text-gray-900">Confirm Password</label>
            <div className="flex items-center border-2 border-transparent bg-slate-100 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-md p-1">
              <input
                id="cpassword_id"
                type={showPassword2 ? "text" : "password"}
                placeholder="Confirm Password"
                className="placeholder-black placeholder:font-medium placeholder:text-sm font-medium text-md w-full bg-transparent bg-opacity-10"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)} // Update confirmPassword state on input change
              />
              <FontAwesomeIcon
                icon={showPassword2 ? faEyeSlash : faEye}
                onClick={toggleShowPassword2}
                className="text-gray-800 cursor-pointer"
              />
              <FontAwesomeIcon icon={faLock} className="text-gray-800 ml-2" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email_id" className="text-lg font-bold text-gray-900">Email</label>
            <div className="flex items-center border-2 border-transparent bg-slate-100 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-md p-1">
              <input
                id="email_id"
                type="email"
                placeholder="Email"
                className="placeholder-black placeholder:font-medium placeholder:text-sm font-medium text-md w-full bg-transparent bg-opacity-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              />
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-800" />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="sel" className="text-lg font-bold text-gray-900">Role</label>
            <div className="flex items-center border-2 border-transparent bg-slate-100 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-md p-1">
              <select
                id="sel"
                className="text-black bg-transparent bg-opacity-10 font-medium text-md w-full"
                name="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)} // Update role state on select change
              >
                <option value="">Role</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
              </select>
              <FontAwesomeIcon icon={faSuitcaseMedical} className="text-gray-800 ml-2" />
            </div>
          </div>
          <button
            className="bg-blue-900 rounded-lg font-black h-10 mt-1 text-slate-200"
            type="submit"
          >
            Register
          </button>
          <div className="flex flex-row justify-between">
            <p className="text-stone-950 font-bold">Already have an account?</p>
            <Link to="/login" className="font-semibold">
              Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;