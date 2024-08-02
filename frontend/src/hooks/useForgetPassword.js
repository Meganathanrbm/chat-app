import React, { useState } from "react";
import toast from "react-hot-toast";

const useForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const forgetPassword = async (emailId) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      toast.success(data.message);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgetPassword };
};

export default useForgetPassword;
