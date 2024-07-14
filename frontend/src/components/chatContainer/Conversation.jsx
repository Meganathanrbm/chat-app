import React, { useContext } from "react";
import useConversation from "../../zustand/useConversation";
import { SocketContext } from "../../context/SocketContext";

export const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useContext(SocketContext);

  const isActive = conversation?._id === selectedConversation?._id; // selected conversation
  const isOnline = onlineUsers?.includes(conversation?._id); // online status

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`${
        isActive ? "bg-blue-200 dark:bg-gray-700" : ""
      } px-5 sm:px-6 flex py-[10px] gap-4 rounded-lg cursor-pointer`}
    >
      {/* profile picture */}
      <div className={`avatar ${isOnline && "online"}`}>
        <div className="w-10 h-10 rounded-full">
          <img src={conversation?.profilePic} />
        </div>
      </div>
      {/* username & last message */}
      <div className="">
        <h4 className="font-semibold line-clamp-1 text-black capitalize dark:text-slate-100 text-base ">
          {conversation?.fullname}
        </h4>
        <p className="text-[13px] leading-5 text-slate-500 dark:text-slate-400 font-normal">
          How are you?
        </p>
      </div>
    </div>
  );
};
