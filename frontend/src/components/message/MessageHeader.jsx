import React, { useContext } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import { SocketContext } from "../../context/SocketContext";

const MessageHeader = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers?.includes(selectedConversation?._id);
  const hanldeBackFromConversation = () => {
    setSelectedConversation(null);
  };
  return (
    <div className="bg-messageHeader w-full flex items-center gap-4 px-5 sm:px-6 py-3 dark:border-b-gray-800 border-b">
      {/* back button */}
      <div onClick={hanldeBackFromConversation}>
        <IoArrowBackOutline className="text-2xl text-black dark:text-white cursor-pointer" />
      </div>
      {/* profile pic & username */}
      <div className="flex gap-4 rounded-lg">
        {/* profile picture */}
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img src={selectedConversation.profilePic} />
          </div>
        </div>
        {/* username & last message */}
        <div className="">
          <h4 className="font-bold line-clamp-1 dark:text-slate-100 capitalize  text-black text-base">
            {selectedConversation.fullname}
          </h4>
          <p className="text-xs  font-semibold">
            {isOnline ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span>Offline</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
