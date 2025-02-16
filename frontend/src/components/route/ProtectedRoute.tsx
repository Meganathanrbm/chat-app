import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const ProtectedRoute: React.FC = ():JSX.Element => {
  const { authUser } = useContext(AuthContext);

  return authUser ? <Outlet /> : <Navigate to="/auth/login" />;
};
