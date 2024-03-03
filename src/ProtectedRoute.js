import React from 'react';
import WelcomePage from './pages/WelcomePage';

const ProtectedRoute = ({ usrData, children, UsrForm }) => {

    return usrData ? <>{children}</> : <WelcomePage  UsrForm={UsrForm} />;
    
};

export default ProtectedRoute;
