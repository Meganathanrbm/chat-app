import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { APIResponseTy } from "../types/hooks";
import { MessageState } from "../types/zustand";

const useLastMessage = (receiverId: string) => {
  const { messages, selectedConversation, setSelectedConversation } =
    useConversation();

  const [lastMessage, setLastMessage] = useState<MessageState | null>(null);
  useEffect(() => {
    const getLastMessage = async (receiverId: string): Promise<void> => {
      try {
        const response = await fetch(`/api/message/last/${receiverId}`);
        const data: APIResponseTy<MessageState> = await response.json();
        if (!data.data) {
          throw new Error("Invalid response from server.");
        }
        setLastMessage(data.data);
      } catch (error) {
        console.log(error);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        toast.error(errorMessage);
      }
    };
    getLastMessage(receiverId);
  }, [messages, selectedConversation, setSelectedConversation, receiverId]);
  return lastMessage;
};

export default useLastMessage;
