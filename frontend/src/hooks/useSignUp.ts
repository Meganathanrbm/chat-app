import  { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { APIResponseTy } from "../types/hooks";
import { UserBaseType } from "../types";

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useContext(AuthContext);
  const signup = async ({ fullname, mobile, emailId, gender }:{fullname: string, mobile: number, emailId: string, gender: string}): Promise<void> => {
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
      const data: APIResponseTy<UserBaseType > = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if(data.data){
      //store local storage
      localStorage.setItem("chat-user", JSON.stringify(data.data));
      
      // context
      setAuthUser(data.data);
      }
      sessionStorage.removeItem("current-user-emailID");
    } catch (error) {
      console.log(error);
      const errorMessage =  error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignUp;
