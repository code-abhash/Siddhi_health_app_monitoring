
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Auth_contxt/Authcontext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    return user ? children : <Navigate to="/login" state={{ from: location, message: "Please log in to access this page" }} />;
};

export default PrivateRoute;
