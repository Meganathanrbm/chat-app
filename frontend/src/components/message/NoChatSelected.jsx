import React, { useContext } from "react";
import { PiChats } from "react-icons/pi";
import { AuthContext } from "../../context/AuthContext";

const NoChatSelected = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="bg-messageContent p-6 center h-full w-full">
      <div className="px-4 text-center center sm:text-lg md:text-2xl text-slate-500 font-semibold flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullname}</p>
        <p>Select a chat to start messaging</p>
        <PiChats className="text-3xl md:text-7xl text-center" />
      </div>
    </div>
  );
};

export default NoChatSelected;
