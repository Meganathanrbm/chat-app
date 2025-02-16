import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { APIResponseTy } from "../types/hooks";

const useLogOut = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useContext(AuthContext);
  const {  setSelectedConversation } = useConversation();

  const logout = async ():Promise<void> => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data:APIResponseTy<string> = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(true);
      // Clear the selected conversation
      setSelectedConversation(null);
      localStorage.removeItem("selectedConversation");
      // Clear the auth user
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      console.log(error);
      const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogOut;
