import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import tone from "../assets/sounds/tone.mp3";

export const useListenMessage = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (message) => {
      const sound = new Audio(tone);
      setMessages([...messages, message]);
      sound.play();
    });
    return () => socket?.off("newMessage");``
  }, [socket, messages, setMessages]);
};
