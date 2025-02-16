import { useState } from "react";
import toast from "react-hot-toast";
import { APIResponse, APIResponseTy } from "../types/hooks";
import { UserBaseType } from "../types";


const useForgetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const forgetPassword = async (emailId:string): Promise<APIResponseTy<UserBaseType>> => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId }),
      });
      const data: APIResponseTy<UserBaseType> = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      if(data.message)  toast.success(data.message);
      return data;
    } catch (error) {
      console.log(error);
      const errorMessage = error instanceof Error? error.message: "An unknown error occurred"
      toast.error(errorMessage);
      return { code:501, message: "",
        error:"" }
    } finally {
      setLoading(false);
    }
  };

  return { loading, forgetPassword };
};

export default useForgetPassword;
