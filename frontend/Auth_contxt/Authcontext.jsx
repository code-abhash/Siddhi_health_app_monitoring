import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode from jwt-decode library
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Swal from "sweetalert2"; // Import SweetAlert2 for notifications
import axios from "axios"; // Import Axios for HTTP requests
import AxiosInstance from "../src/components/Axios/Axios";

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
      const response = await AxiosInstance.post('token/', {
        username,
        password,
      });
  
      if (response.status === 200) {
        const data = response.data; // Axios parses JSON automatically
        setAuthTokens(data); // Set authentication tokens
        setUser(jwtDecode(data.access)); // Decode JWT to get user details
        localStorage.setItem('authTokens', JSON.stringify(data)); // Store auth tokens in localStorage
  
        const userResponse = await AxiosInstance.get(`users/?username=${username}`);
        if (userResponse.status === 200) {
          const userRole = userResponse.data[0].role;
          console.log('User data:', userRole);
          if (userRole === 'nurse') {
            navigate('/patientvitals'); // Redirect to patient vitals page for nurses
          } else {
            navigate('/home'); // Redirect to home page for other roles
          }
        }
  
        Swal.fire({
          title: 'Login Successful',
          icon: 'success',
          toast: true,
          timer: 3000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        title: 'Username or password is incorrect',
        icon: 'error',
        toast: true,
        timer: 3000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  // Function to register user
  const registerUser = async (email, username, role, password, password2) => {
    try {
      // const response = await AxiosInstance.post(`register/`, {
      //    email, username, role, password, password2 ),
      // });
      const response = await AxiosInstance.post(`register/`, {
        email,
        username,
        role,
        password,
        password2,
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