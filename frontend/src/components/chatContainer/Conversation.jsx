import React, { useContext, useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import { SocketContext } from "../../context/SocketContext";
import { useWidth } from "../../hooks/useWidth";
import { useNavigate } from "react-router-dom";
import useLastMessage from "../../hooks/useLastMessage";
import { formatTime } from "../../utils/formatDateTime";
import { AuthContext } from "../../context/AuthContext";

export const Conversation = ({ conversation }) => {
  const navigate = useNavigate();
  // for new message notification tag for 1s.
  const [notify, setNotify] = useState(true);
  const { authUser } = useContext(AuthContext);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useContext(SocketContext);
  const width = useWidth();
  const lastMessage = useLastMessage(conversation?._id); // get last message
  const isActive = conversation?._id === selectedConversation?._id; // selected conversation
  const isOnline = onlineUsers?.includes(conversation?._id); // online status

  const handleSeen = async () => {
    try {
      // seen last message api
      const response = await fetch(`/api/message/lastSeen/${lastMessage?._id}`);
      const data = await response.json;
      return data;
    } catch (error) {
      console.log(error); // ! command this in production.
    }
  };

  // dynamic layout for responsive
  const handleSelectConversation = async () => {
    // remove new message tag if conversation is selected.
    handleSeen();
    setSelectedConversation(conversation);
    if (width) {
      navigate(`/conversation/${conversation?.fullname}`);
    }
  };
  useEffect(() => {
    let timeout;
    setNotify(true);
    if (selectedConversation?._id === lastMessage?.senderId) {
      handleSeen();
      // other end user is online and in the same chat - show notification only for 1s
      timeout = setTimeout(() => {
        setNotify(false);
      }, 1000);
    } else {
      setNotify(true);
    }
    // cleanup function
    return () => clearTimeout(timeout);
  }, [selectedConversation, lastMessage]);
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
          <span
            className={`
            ${
              lastMessage &&
              lastMessage?.message?.length > 0 &&
              !lastMessage?.seen &&
              lastMessage?.senderId != authUser?._id &&
              notify
                ? "text-primary-100"
                : "text-slate-500 shrink-0  dark:text-slate-400"
            }
             ml-auto text-xs float-right fort-normal`}
          >
            {lastMessage.createdAt && formatTime(lastMessage.createdAt)}
          </span>
        </h4>
        <p
          className={`${
            lastMessage &&
            lastMessage?.message?.length > 0 &&
            !lastMessage?.seen &&
            lastMessage?.senderId != authUser?._id &&
            notify
              ? "text-slate-700 dark:text-slate-200"
              : "text-slate-500 dark:text-slate-400"
          }
          text-[13px] leading-5 line-clamp-1 font-normal`}
        >
          {lastMessage?.message}
          {/* for maintain height consistent */}
          <span className=" opacity-0">!</span>
          {/* new message notify tag */}
          {lastMessage &&
            lastMessage?.message?.length > 0 &&
            !lastMessage?.seen &&
            lastMessage?.senderId != authUser?._id && // check - new message is from the other end
            notify && (
              <span className="float-right z-10 absolute right-0 top-1/2 text-white text-[9px] p-1 center mt-1 bg-primary-100 rounded-full w-1 h-1"></span>
            )}
        </p>
      </div>
    </div>
  );
};
