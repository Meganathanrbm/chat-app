import React, { useEffect, useState } from "react";
import { Conversation } from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";
import { FaPlus } from "react-icons/fa6";

export const ChatList = ({ searchInput, setSearchInput }) => {
  const { loading, conversations } = useGetConversation();
  const [allconversations, setAllconversations] = useState(null);

  useEffect(() => {
    const handleSearch = () => {
      const filteredConversations = conversations?.filter(
        (convo) =>
          convo.fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
          convo.mobile.includes(searchInput)
      );
      setAllconversations(filteredConversations);
    };
    handleSearch();
  }, [searchInput]);
  useEffect(() => {
    setAllconversations(conversations);
  }, [conversations]);
  return (
    <div className=" py-3 sm:py-4 divide-y relative dark:divide-gray-800 overflow-y-auto h-full">
      {allconversations?.map((convo) => (
        <Conversation key={convo._id} conversation={convo} />
      ))}
      {allconversations?.length === 0 && searchInput.length > 0 && (
        <p className="text-center">No such user found!</p>
      )}
      <div
        className="absolute bottom-20 md:hidden right-10 p-2 w-10 h-10  center 
      rounded-lg bg-primary-100 cursor-pointer "
      >
        <FaPlus className="text-white font-bold text-lg" />
      </div>
    </div>
  );
};
