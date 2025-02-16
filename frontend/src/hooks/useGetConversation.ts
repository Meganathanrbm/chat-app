import  { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { SocketContext } from "../context/SocketContext";
import { APIResponseTy } from "../types/hooks";
import { UserBaseType } from "../types";



const useGetConversation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<UserBaseType[] | []>([]);
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    const getConversation = async ():Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch("/api/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data:  APIResponseTy<UserBaseType[]> = await response.json();
        setConversations(data.data??[]);
      } catch (error) {
        console.log(error);
        const errorMessage = error instanceof Error?error.message :"An unknown error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, [messages, setMessages]);

  useEffect(() => {
    if(!socket) return
    socket.on("newChatList", (conversation) => {
      setConversations(conversation);
    });
    return () =>{ socket.off("newChatList");}
  }, [socket]);

  return { loading, conversations };
};

export default useGetConversation;
