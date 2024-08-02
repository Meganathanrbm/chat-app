import React, { useContext } from "react";
import useConversation from "../../zustand/useConversation";
import { SocketContext } from "../../context/SocketContext";
import { useWidth } from "../../hooks/useWidth";
import { useNavigate } from "react-router-dom";
import useLastMessage from "../../hooks/useLastMessage";
import { formatTime } from "../../utils/formatDateTime";

export const Conversation = ({ conversation }) => {
  const navigate = useNavigate();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useContext(SocketContext);
  const width = useWidth();
  const lastMessage = useLastMessage(conversation?._id); // get last message
  const isActive = conversation?._id === selectedConversation?._id; // selected conversation
  const isOnline = onlineUsers?.includes(conversation?._id); // online status

  // dynamic layout for responsive
  const handleSelectConversation = () => {
    setSelectedConversation(conversation);
    if (width) {
      navigate(`/conversation/${conversation?.fullname}`);
    }
  };
  return (
    <div
      onClick={handleSelectConversation}
      className={`${
        isActive ? "bg-blue-200 dark:bg-gray-700" : ""
      } px-5 sm:px-6 flex py-[10px]  gap-4 rounded-lg cursor-pointer`}
    >
      {/* profile picture */}
      <div className={`avatar ${isOnline && "online"}`}>
        <div className="w-10 h-10 rounded-full">
          <img src={conversation?.profilePic} />
        </div>
      </div>
      {/* username & last message */}
      <div className="w-full relative">
        <h4 className="font-semibold  flex w-full line-clamp-1 text-black capitalize dark:text-slate-100 text-base ">
          {conversation?.fullname}
          <span className="text-slate-500 shrink-0  dark:text-slate-400 ml-auto text-xs float-right fort-normal">
            {lastMessage.createdAt && formatTime(lastMessage.createdAt)}
          </span>
        </h4>
        <p className="text-[13px] leading-5 text-slate-500 dark:text-slate-400 font-normal">
          {lastMessage?.message}
          {/* for maintain height consistent */}
          <span className=" opacity-0 ">!</span>
        </p>
      </div>
    </div>
  );
};
