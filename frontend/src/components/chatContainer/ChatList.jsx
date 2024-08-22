import React, { useEffect, useState } from "react";
import { Conversation } from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { FaPlus } from "react-icons/fa6";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import { useListenMessage } from "../../hooks/useListenMessage";

export const ChatList = ({ searchInput, searchRef, setSearchInput }) => {
  const { conversations } = useGetConversation();
  const [allconversations, setAllconversations] = useState(null);
  const { allUsers } = useGetAllUsers();
  useListenMessage();
  useEffect(() => {
    const handleSearch = () => {
      // Todo: filter mobile number also
      const filteredConversations = allUsers?.filter(
        (convo) =>
          convo.fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
          convo.emailId.toLowerCase().includes(searchInput.toLowerCase())
      );
      searchInput.length >= 1 && setAllconversations(filteredConversations);
    };
    handleSearch();
  }, [searchInput]);

  useEffect(() => {
    searchInput.length < 1 && setAllconversations(conversations);
  }, [conversations, searchInput]);
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
        onClick={() => searchRef.current.focus()}
      >
        <FaPlus className="text-white font-bold text-lg" />
      </div>
    </div>
  );
};
