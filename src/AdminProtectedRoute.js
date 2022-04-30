import React from 'react'

import { Navigate } from 'react-router-dom';

function AdminProtectedRoute(props) {
    const isAuthenticated = localStorage.getItem("admin");
    if (!isAuthenticated) {
        return <Navigate to={"/admin/login"} />
    }
    return props.children;
}

export default AdminProtectedRoute;