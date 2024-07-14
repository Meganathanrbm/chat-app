import React from "react";
import { SidePanel } from "./SidePanel";
import ChatContainer from "./ChatContainer";
import { MessageContainer } from "./MessageContainer";
import NoChatSelected from "../../components/message/NoChatSelected";

const Home = () => {
  return (
    <div className="h-full w-full flex">
      <SidePanel />
      <ChatContainer />
      <MessageContainer />
    </div>
  );
};

export default Home;
