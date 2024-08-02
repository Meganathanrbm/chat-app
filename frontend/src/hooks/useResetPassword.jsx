import React, { useState } from "react";
import toast from "react-hot-toast";

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ password, confirmPassword, token }) => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        return toast.error("Password doesn't match!");
      }
      const response = await fetch(
        `/api/auth/resetPassword?resetPasswordToken=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirmPassword }),
        }
      );
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

export default useResetPassword;
