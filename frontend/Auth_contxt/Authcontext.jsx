


import { createContext, useState, useEffect, useContext} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;



export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const loginUser = async (username, password) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                axios.get(`http://127.0.0.1:8000/api/users/?username=${username}`).then(response => {
                    // Handle successful response
                    console.log('User data:', response.data[0].role);
                    if(response.data[0].role==='nurse'){
                        navigate("/patientvitals");
                    }
                  }) 
                  .catch(error => {
                    // Handle errors
                    console.error('Error fetching user data:', error);
                  });
                navigate("/home");
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire({
                title: "Username or password is incorrect",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    const registerUser = async (email,username, role, password, password2) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email,username, role, password, password2 })
            });

            if (response.status === 201) {
                navigate("/login");
                Swal.fire({
                    title: "Registration Successful",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                throw new Error(`Registration failed with status ${response.status}`);
            }
        } catch (error) {
            console.error("Registration error:", error);
            Swal.fire({
                title: "Registration Error",
                text: error.message,
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
        Swal.fire({
            title: "Logged Out Successfully",
            icon: "success",
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    const contextData = {
        user,
        authTokens,
        loginUser,
        registerUser,
        logoutUser,
        isAuthenticated: authTokens !== null && user !== null,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

//export const useAuth = () => useContext(AuthContext);