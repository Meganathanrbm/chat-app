import React, { useState } from "react";
import toast from "react-hot-toast";

const useVerifyOTP = () => {
  const [loading, setLoading] = useState(false);

  const verifyOTP = async (otp) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otp),
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, verifyOTP };
};

export default useVerifyOTP;
