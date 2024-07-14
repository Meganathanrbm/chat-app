import React, { useEffect, useRef } from "react";
import { Message } from "./Message";
import useGetMessages from "../../hooks/useGetMessages";

const MessageList = ({}) => {
  const { loading, messages } = useGetMessages();
  // Which has the direct accesst to the dom element.
  // it set the last element to the ref.
  // so, it is easy to scroll to the last message.
  const lastMessageRef = useRef();
  useEffect(() => {
    //scroll to the lastmessage after all the render done
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="flex flex-col ">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div ref={lastMessageRef} key={message._id}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default MessageList;
