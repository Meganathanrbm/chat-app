import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const signup = async ({ fullname, mobile, emailId, gender }) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          mobile,
          emailId,
          gender,
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
      sessionStorage.removeItem("current-user-emailID");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignUp;
