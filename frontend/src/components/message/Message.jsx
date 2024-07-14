import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { formatTime } from "../../utils/formatDateTime";

export const Message = ({ message }) => {
  const { authUser } = useContext(AuthContext);
  const { selectedConversation } = useConversation();
  const fromMe = authUser._id === message.senderId;
  // display only the selected coversation messages
  const isSelected =
    selectedConversation._id === message?.receiverId ||
    selectedConversation._id === message?.senderId;

  return (
    isSelected && (
      <div className={`${fromMe ? "chat-end" : "chat-start"} chat`}>
        <div className="chat-image avatar">
          <div className="w-8 h-8 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                fromMe ? authUser.profilePic : selectedConversation.profilePic
              }
            />
          </div>
        </div>
        <div
          className={`${
            fromMe
              ? " text-white bg-primary-100"
              : " text-slate-200 bg-gray-700"
          } chat-bubble text-base lg:max-w-lg  w-auto`}
        >
          {message.message}
        </div>
        <div className="chat-footer text-[11px] mt-[1px] gap-1 flex items-center">
          {formatTime(message.updatedAt)}
        </div>
      </div>
    )
  );
};
