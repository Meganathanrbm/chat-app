import React, { useContext, useEffect } from "react";
import BackgroundDesign from "../../components/ui/BackgroundDesign";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Auth = () => {
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full center relative overflow-hidden h-full ">
      <BackgroundDesign />
      <Outlet />
    </div>
  );
};

export default Auth;
