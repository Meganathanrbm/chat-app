import React, { useEffect } from "react";
import MessageHeader from "../../components/message/MessageHeader";
import MessageContent from "../../components/message/MessageContent";
import MessageInput from "../../components/message/MessageInput";
import NoChatSelected from "../../components/message/NoChatSelected";
import useConversation from "../../zustand/useConversation";
import { useWidth } from "../../hooks/useWidth";
import { useParams } from "react-router-dom";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation, viewProfile } =
    useConversation();

  return (
    <section
      className={`w-full h-full flex ${viewProfile && "md:hidden lg:flex "}
     flex-col overflow-hidden border-r dark:border-r-gray-800 `}
    >
      {selectedConversation ? (
        <>
          <MessageHeader />
          <MessageContent />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </section>
  );
};
