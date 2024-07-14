import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="w-full mt-auto shrink-0 border-t dark:border-t-gray-700 bg-messageInput px-6 py-1 pb-3"
    >
      <label className="input input-bordered input-md text-gray-800 dark:text-white dark:bg-[#1C222A] bg-slate-100 flex items-center mt-2">
        <input
          type="text"
          className="grow input-md text-base placeholder:text-slate-500"
          placeholder="Send a Message."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="max-w-10 min-w-8 center shrink h-full">
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <IoSend className="w-5 h-5 text-slate-500 text-base cursor-pointer" />
          )}
        </button>
      </label>
    </form>
  );
};

export default MessageInput;
