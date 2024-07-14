import React, { useEffect } from "react";
import MessageHeader from "../../components/message/MessageHeader";
import MessageContent from "../../components/message/MessageContent";
import MessageInput from "../../components/message/MessageInput";
import NoChatSelected from "../../components/message/NoChatSelected";
import useConversation from "../../zustand/useConversation";

export const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <section className="w-full h-full md:flex
     flex-col overflow-hidden hidden ">
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
