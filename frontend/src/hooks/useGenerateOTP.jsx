import React, { useState } from "react";
import toast from "react-hot-toast";

const useGenerateOTP = () => {
  const [loading, setLoading] = useState(false);

  const generateOTP = async (data, path) => {
    setLoading(true);
    if (data?.password !== data?.confirmPassword) {
      return toast.error("Password doesn't match!");
    }
    try {
      console.log(data);
      const response = await fetch("/api/auth/" + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.error) {
        return toast.error(result.error);
      }
      return result;
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { generateOTP, loading };
};

export default useGenerateOTP;
