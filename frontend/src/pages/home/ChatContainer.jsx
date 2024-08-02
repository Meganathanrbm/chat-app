import React, { useRef, useState } from "react";
import { ChatHeader } from "../../components/chatContainer/ChatHeader";
import { ChatList } from "../../components/chatContainer/ChatList";

const ChatContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef();
  return (
    <section
      className=" h-full w-full md:min-w-[350px] lg:min-w-[350px] lg:max-w-[400px]  xl:min-w-[400px]
    bg-chatContainer border-r dark:border-r-gray-800 flex flex-col overflow-hidden"
    >
      {/* padding-6 */}
      <ChatHeader
        searchInput={searchInput}
        searchRef={searchRef}
        setSearchInput={setSearchInput}
      />
      <div className="px-6">
        <hr className="dark:border-gray-800" />
      </div>
      <ChatList
        searchRef={searchRef}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </section>
  );
};

export default ChatContainer;
