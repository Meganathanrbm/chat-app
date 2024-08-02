import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const ProtectedRoute = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);

  return authUser ? <Outlet /> : <Navigate to="/auth/login" />;
};
