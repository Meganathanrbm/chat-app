import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { SocketContext } from "../context/SocketContext";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState();
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();
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
  }, [messages, setMessages]);

  useEffect(() => {
    socket?.on("newChatList", (conversation) => {
      setConversations(conversation);
    });
    return () => socket?.off("newChatList");
  }, [socket]);

  return { loading, conversations };
};

export default useGetConversation;
