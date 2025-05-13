// Updated ProtectedRoute.jsx - Using unified auth method
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Log authentication state for debugging
  useEffect(() => {
    console.log(
      "Auth status:",
      isAuthenticated() ? "Authenticated" : "Not authenticated"
    );
  }, []);

  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    console.log("User not authenticated. Redirecting to login page.");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
