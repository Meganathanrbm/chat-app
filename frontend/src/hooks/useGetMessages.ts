import  { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { APIResponseTy } from "../types/hooks";
import { MessageState } from "../types/zustand";

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  
  useEffect(() => {
    const getMessage = async ():Promise<void> => {
      try {
        setLoading(true);
        const res = await fetch(`/api/message/${selectedConversation?._id}`);
        const data: APIResponseTy<MessageState[]> = await res.json();
      
        if(data.data) setMessages(data.data);
      } catch (error) {
        console.log(error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessage();
  }, [selectedConversation?._id, setMessages]);
  return { loading, messages };
};

export default useGetMessages;
