import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useLastMessage = (receiverId) => {
  const { messages } = useConversation();
  const [lastMessage, setLastMessage] = useState("");
  useEffect(() => {
    const getLastMessage = async (receiverId) => {
      try {
        const response = await fetch(`/api/message/last/${receiverId}`);
        const data = await response.json();
        setLastMessage(data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    getLastMessage(receiverId);
  }, [messages, receiverId]);
  return lastMessage;
};

export default useLastMessage;
