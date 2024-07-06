import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode from jwt-decode library
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Swal from "sweetalert2"; // Import SweetAlert2 for notifications
import axios from "axios"; // Import Axios for HTTP requests

const AuthContext = createContext(); // Create authentication context

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")) // Retrieve auth tokens from localStorage if available
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens")) // Decode user details from JWT in localStorage
      : null
  );

  const [loading, setLoading] = useState(true); // Loading state for initial loading
  const navigate = useNavigate(); // Hook for navigation instead of useHistory

  // Function to login user
  const loginUser = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json(); // Parse response data

      if (response.status === 200) { // If login successful
        setAuthTokens(data); // Set authentication tokens
        setUser(jwtDecode(data.access)); // Decode JWT to get user details
        localStorage.setItem("authTokens", JSON.stringify(data)); // Store auth tokens in localStorage
        axios
          .get(`http://127.0.0.1:8000/api/users/?username=${username}`)
          .then((response) => {
            // Handle successful response
            console.log("User data:", response.data[0].role);
            if (response.data[0].role === "nurse") {
              navigate("/patientvitals"); // Redirect to patient vitals page for nurses
            }
          })
          .catch((error) => {
            // Handle errors
            console.error("Error fetching user data:", error);
          });
        navigate("/home"); // Redirect to home page after login
        Swal.fire({ // Show success notification
          title: "Login Successful",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({ // Show error notification for login failure
        title: "Username or password is incorrect",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // Function to register user
  const registerUser = async (email, username, role, password, password2) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, role, password, password2 }),
      });

      if (response.status === 201) { // If registration successful
        navigate("/login"); // Redirect to login page after successful registration
        Swal.fire({ // Show success notification
          title: "Registration Successful",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        throw new Error(`Registration failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({ // Show error notification for registration failure
        title: "Registration Error",
        text: error.message,
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // Function to logout user
  const logoutUser = () => {
    setAuthTokens(null); // Clear auth tokens
    setUser(null); // Clear user data
    localStorage.removeItem("authTokens"); // Remove auth tokens from localStorage
    navigate("/login"); // Redirect to login page after logout
    Swal.fire({ // Show logout success notification
      title: "Logged Out Successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    setLoading(false); // Set loading state to false after initial loading
  }, []);

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
    isAuthenticated: authTokens !== null && user !== null, // Check if user is authenticated
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
};