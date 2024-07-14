import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="w-full justify-between flex-col animate-pulse">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-8 h-8 rounded-full">
            <div className="cus-skeleton  w-10 h-10 rounded-full shrink-0"></div>
          </div>
        </div>
        <div className="cus-skeleton chat-bubble h-4 shrink w-52"></div>
        <div className="chat-footer cus-skeleton mt-1 w-20 h-4 text-xs gap-1 flex items-center"></div>
      </div>
      <div className="chat-end chat">
        <div className="chat-image avatar">
          <div className="w-8 h-8 rounded-full">
            <div className="cus-skeleton  w-10 h-10 rounded-full shrink-0"></div>
          </div>
        </div>
        <div className="cus-skeleton chat-bubble h-4 shrink w-52"></div>
        <div className="chat-footer cus-skeleton mt-1 w-20 h-4 text-xs gap-1 flex items-center"></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
