import  { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { APIResponseTy } from "../types/hooks";
import { UserBaseType } from "../types";

const useLogIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useContext(AuthContext);
  const login = async ({ emailId, password }:{emailId: string, password: string}): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          emailId,
        }),
      });
      const data: APIResponseTy<UserBaseType> = await response.json();
      if (!data.data) {
        throw new Error("Invalid response from server.");
      }
      //store local storage
      localStorage.setItem("chat-user", JSON.stringify(data.data));
      // context
      setAuthUser(data.data);
    } catch (error) {
      console.log(error);
      const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogIn;



