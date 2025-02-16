import { useState } from "react";
import toast from "react-hot-toast";
import { APIResponseTy, EmailData } from "../types/hooks";

const useVerifyOTP = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const verifyOTP = async ({
    otp,
    emailId,
  }: {
    otp: number;
    emailId: string;
  }): Promise<EmailData | void> => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, emailId }),
      });
      const data: APIResponseTy<EmailData> = await response.json();
      return data.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, verifyOTP };
};

export default useVerifyOTP;
