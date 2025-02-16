import { useState } from "react";
import toast from "react-hot-toast";
import { APIResponseTy } from "../types/hooks";
import { UserBaseType } from "../types";

const useGenerateOTP = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const generateOTP = async (
    data: {
      emailId: string;
      password?: string;
      confirmPassword?: string;
    },
    path: string
  ): Promise<APIResponseTy<UserBaseType> | void> => {
    setLoading(true);
    if (data?.password !== data?.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/auth/" + path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: APIResponseTy<UserBaseType> = await response.json();
      if (result.error) {
        toast.error(result.error);
        return;
      }
      return result;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { generateOTP, loading };
};

export default useGenerateOTP;
