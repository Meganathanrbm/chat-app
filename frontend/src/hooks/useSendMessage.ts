import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { APIResponseTy } from "../types/hooks";
import { MessageState } from "../types/zustand";

const useSendMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message: string):Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/message/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const data: APIResponseTy<MessageState> = await response.json();
      if (data.error) throw new Error(data.error);
      const responseData = data.data ? [...messages, data.data] : [...messages]
      setMessages(responseData);
    } catch (error) {
      console.log(error);
      const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
