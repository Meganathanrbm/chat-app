import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const { selectedConversation, setSelectedConversation } = useConversation();

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(true);
      // Clear the selected conversation
      setSelectedConversation(null);
      localStorage.clear("selectedConversation");
      // Clear the auth user
      localStorage.clear("chat-user");
      setAuthUser(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogOut;
