import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ usrData, children }) => {

    if (usrData) {

        return <Navigate to='/' replace />

    } else {

        return <>{children}</>;

    }

}

export default ProtectedRoute
