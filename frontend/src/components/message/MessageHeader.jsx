import React, { useContext } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import { SocketContext } from "../../context/SocketContext";
import { useWidth } from "../../hooks/useWidth";
import { Link, Navigate, useNavigate } from "react-router-dom";

const MessageHeader = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    viewProfile,
    setViewProfile,
  } = useConversation();

  const { onlineUsers } = useContext(SocketContext);
  const width = useWidth();
  const navigate = useNavigate();
  const isOnline = onlineUsers?.includes(selectedConversation?._id);
  const hanldeBackFromConversation = () => {
    if (width) {
      navigate("/");
    }
    setSelectedConversation(null);
  };
  const handleViewProfile = () => {
    setViewProfile(selectedConversation);
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
        <Link
          to={viewProfile && `/profile/${selectedConversation?.fullname}`}
          onClick={handleViewProfile}
          className="avatar"
        >
          <div className="w-10 h-10 rounded-full cursor-pointer">
            <img src={selectedConversation.profilePic} />
          </div>
        </Link>
        {/* username & last message */}
        <div className="">
          <Link
            to={viewProfile && `/profile/${selectedConversation?.fullname}`}
            onClick={handleViewProfile}
            className="font-bold line-clamp-1 cursor-pointer dark:text-slate-100 capitalize  text-black text-base"
          >
            {selectedConversation?.fullname}
          </Link>
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
