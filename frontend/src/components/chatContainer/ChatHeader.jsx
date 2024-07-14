import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";

export const ChatHeader = ({ searchInput, setSearchInput }) => {
  return (
    <div className="px-6 py-3 sm:py-4">
      {/* Title */}
      <div className="flex justify-between items-center mb-4 py-3">
        <h3 className="font-semibold text-primary-100 text-2xl capitalize">
          Messages
        </h3>
        {/* three Dots */}
        <div className="">
          <BsThreeDotsVertical className="h-6 w-6 cursor-pointer text-black dark:text-white" />
        </div>
      </div>

      {/* Search */}
      <label className="input input-bordered input-md text-gray-800 dark:text-white dark:bg-[#1C222A] bg-slate-100 flex items-center mt-2 gap-2">
        <IoSearchSharp className="w-5 h-5 text-slate-500 text-base" />
        <input
          type="text"
          className="grow input-md text-base placeholder:text-slate-500"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput.length > 0 && (
          <HiMiniXMark
            onClick={() => setSearchInput("")}
            className="w-5 h-5 text-slate-500 cursor-pointer text-base"
          />
        )}
      </label>
    </div>
  );
};
