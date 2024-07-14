import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState();
  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setConversations(data.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      } finally {
        setLoading(false); 
      }
    };
    getConversation();
  }, []);
  return { loading, conversations };
};

export default useGetConversation;
