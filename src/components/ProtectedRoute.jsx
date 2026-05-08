import React from "react";
import { Navigate } from "react-router-dom";
import { getStoredUserInfo } from "../_services/auth";

export default function ProtectedRoute({ role, children }) {
  const user = getStoredUserInfo();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role && user?.roles?.indexOf(role) === -1) {
    // Not authorized to view this route
    return <Navigate to="/" replace />;
  }

  return children;
}
