import { useState } from "react";
import toast from "react-hot-toast";
import { APIResponseTy } from "../types/hooks";

const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const resetPassword = async ({
    password,
    confirmPassword,
    token,
  }: {
    password: string;
    confirmPassword: string;
    token: string;
  }): Promise<APIResponseTy<string> | void> => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toast.error("Password doesn't match!");
        return;
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
      const data: APIResponseTy<string> = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, resetPassword };
};

export default useResetPassword;
