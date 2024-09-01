import React from "react";
import MessageHeader from "../../components/message/MessageHeader";
import MessageContent from "../../components/message/MessageContent";
import MessageInput from "../../components/message/MessageInput";
import NoChatSelected from "../../components/message/NoChatSelected";
import useConversation from "../../zustand/useConversation";

export const MessageContainer = () => {
  const { selectedConversation, viewProfile } = useConversation();

  return (
    <section
      className={`w-full h-dvh sm:h-full flex ${
        viewProfile && "md:hidden lg:flex "
      }
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
