import React from 'react';
import { Navigate } from 'react-router-dom';
import Body from './Body';

const ProtectedRoutes = () => {
    const auth = localStorage.getItem("loggedin");
    return auth ? <Body /> : <Navigate to={"/home"} />
}

export default ProtectedRoutes;