import React, { useContext, useEffect } from "react";
import DarkToggle from "../../components/ui/DarkToggle";
import BackgroundDesign from "../../components/ui/BackgroundDesign";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Auth = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authUser) {
      navigate("/");
    } else {
      navigate("/auth/login");
    }
  }, []);
  return (
    <div className="w-full center relative overflow-hidden h-full ">
      <BackgroundDesign />
      <DarkToggle />
      <Outlet />
    </div>
  );
};

export default Auth;
