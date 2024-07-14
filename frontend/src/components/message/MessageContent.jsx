import React, { useEffect, useRef } from "react";
import { Message } from "./Message";
import MessageSkeleton from "./Message.skeleton";
import useGetMessages from "../../hooks/useGetMessages";
import { useListenMessage } from "../../hooks/useListenMessage";
import MessageList from "./MessageList";

const MessageContent = () => {
  const { loading, messages } = useGetMessages();
  useListenMessage();

  return (
    <div className="bg-messageContent px-6 py-4 h-full w-full overflow-auto ">
      {loading && [...Array(2)].map((_, i) => <MessageSkeleton key={i} />)}
      {!loading && messages.length == 0 && (
        <p className="text-center text-base">
          Send a message to start the coversation
        </p>
      )}
      <MessageList />
    </div>
  );
};

export default MessageContent;
