import React, { useState } from "react";
import { ChatHeader } from "../../components/chatContainer/ChatHeader";
import { ChatList } from "../../components/chatContainer/ChatList";

const ChatContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <section
      className=" h-full w-full md:w-[600px] lg:max-w-[650px] lg:min-w-[400px]
    bg-chatContainer border-r dark:border-r-gray-800 flex flex-col overflow-hidden"
    >
      {/* padding-6 */}
      <ChatHeader searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="px-6">
        <hr className="dark:border-gray-800" />
      </div>
      <ChatList searchInput={searchInput} setSearchInput={setSearchInput} />
    </section>
  );
};

export default ChatContainer;
