import React from "react";
import { SidePanel } from "./SidePanel";
import ChatContainer from "./ChatContainer";
import { MessageContainer } from "./MessageContainer";
import { Profile } from "../../components/profile/Profile";
import useConversation from "../../zustand/useConversation";
import { useListenMessage } from "../../hooks/useListenMessage";

const Home = () => {
  const { viewProfile } = useConversation();
  useListenMessage();
  return (
    <div className="h-full w-full flex">
      <SidePanel />
      <ChatContainer />
      <MessageContainer />
      {viewProfile && <Profile />}
    </div>
  );
};

export default Home;
