import React from "react";
import { SidePanel } from "./SidePanel";
import ChatContainer from "./ChatContainer";
import { MessageContainer } from "./MessageContainer";
import { Profile } from "../../components/profile/Profile";
import useConversation from "../../zustand/useConversation";

const Home = () => {
  const { viewProfile } = useConversation();
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
