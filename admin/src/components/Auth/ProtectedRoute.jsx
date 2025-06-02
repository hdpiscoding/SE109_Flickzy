import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuthStore();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
}