import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogIn = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const login = async ({ emailId, password }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          emailId,
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //store local storage
      localStorage.setItem("chat-user", JSON.stringify(data.data));
      // context
      setAuthUser(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogIn;
