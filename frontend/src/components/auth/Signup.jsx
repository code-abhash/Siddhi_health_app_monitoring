import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faSuitcaseMedical,
  faUser,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import img4 from "./img/logo.png";
import "./Auth.css";
import Swal from "sweetalert2";
import "./CustomSwal.css";
import AuthContext from "../../../Auth_contxt/Authcontext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const {registerUser} = useContext(AuthContext)

  


  const handleSubmit = async e => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9]).{9,}$/;

    if (password !== password2) {
      // setError("Passwords do not match");}
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match",
        position: 'top-right',
        timer: 3000,
        customClass: {
          popup: 'my-swal'
        }
      });}

    else if (!passwordRegex.test(password)) {
      // setError("Password must be at least 8 characters long and contain at least one number and one alphabet");}
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 9 characters long and contain at least one number",
        position: 'top-right',
        timer: 3000,
        customClass: {
          popup: 'my-swal'
        }
      });}

    else if (!emailRegex.test(email)) {
      // setError("Please enter a valid email address");}
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        position: 'top-right',
        timer: 3000,
        customClass: {
          popup: 'my-swal'
        }
      });}

    else{
      setError("")
      registerUser(email, username, role, password, password2)
      console.log(email);
      console.log(username);
      console.log(role);
      console.log(password);
      console.log(password2);
    }
  }

  return (
    <div className="flex flex-col bgimg">
      <center>
        <img
          src={img4}
          alt="logo"
          className="w-auto h-10 m-4 border-2 rounded"
        ></img>{error && <div className="alert alert-danger font-bold text-red-700">{error}</div>}
      </center>
      <div className="flex flex-col justify-center items-center   backdrop-filter backdrop-blur-xl border-opacity-30 shadow-lg m-auto  p-5 w-full sm:w-4/5 md:w-4/6 lg:w-2/5  border-2  rounded-3xl ">
        <div className=" font-mono font-bold text-4xl underline">Sign up</div>
        <div className="flex flex-col gap-3 mt-8">
        
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8">
          <div className="flex justify-around items-center mt-5 w-72 border-transparent  border-2 bg-slate-100 bg-opacity-10 backdrop-filter  backdrop-blur-xl shadow-2xl rounded-lg">
            <input
              id="username_id"
              type="text"
              placeholder="Username"
              className="placeholder-black rounded-md placeholder:font-medium placeholder:text-lg font-medium text-lg  w-64  bg-transparent bg-opacity-10"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="flex justify-around items-center bg-slate-100  w-72 border-transparent  border-2  bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg">
            <input
              id="password_id"
              type="password"
              placeholder="Password"
              className="placeholder-black placeholder:font-medium placeholder:text-lg font-medium text-lg  w-64  bg-transparent bg-opacity-10 "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="flex justify-around items-center bg-slate-100 w-72 border-transparent border-2  bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg">
            <input
              id="cpassword_id"
              type="password"
              placeholder="Confirm Password"
              className="placeholder-black placeholder:font-medium placeholder:text-lg font-medium text-lg  w-64  bg-transparent bg-opacity-10"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            ></input>
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="flex justify-around items-center w-72 bg-slate-100 border-transparent border-2  bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg">
            <input
              id="email_id"
              type="email"
              placeholder="Email"
              className="placeholder-black placeholder:font-medium placeholder:text-lg font-medium text-lg  w-64  bg-transparent bg-opacity-10"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className="flex justify-between bg-slate-100 items-center border-transparent  border-2 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-lg">
            <select
              id="sel"
              className="text-black bg-transparent bg-opacity-10 font-medium text-lg"
              name="Role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="">Occupation</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
            </select>
            <FontAwesomeIcon icon={faSuitcaseMedical} className="mr-1" />
          </div>
          <button
            className="bg-blue-900 rounded-lg font-black h-10 mt-5 text-slate-200"
            type="submit"
          >
            Register
          </button>
          <div className="flex flex-row  justify-between">
            <p className="text-stone-950 font-bold ">
              Already have an account?
            </p>
            <Link to="/login" className="font-semibold mb-5 ">
              Login!
            </Link>
            <div>
            </div>    
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
