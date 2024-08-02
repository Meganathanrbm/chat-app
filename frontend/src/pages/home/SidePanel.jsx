import React, { useContext, useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import useLogOut from "../../hooks/useLogOut";
import { AuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import DarkToggle from "../../components/ui/DarkToggle";

export const SidePanel = () => {
  const { setViewProfile } = useConversation();
  const { logout } = useLogOut();
  const { authUser } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
  };
  const hanldeViewProfile = () => {
    setViewProfile(authUser);
  };

  return (
    <section className="h-full w-[75px] border-r dark:border-r-gray-800 flex-col shrink-0 p-4 bg-sidePanel hidden xl:flex ">
      <ul className="flex flex-col items-center justify-center h-full">
        <li className="p-2 w-10 h-10 my-2 center rounded-lg bg-primary-100 text-white cursor-pointer">
          <IoChatbubbleEllipsesOutline className="h-6 w-6 " />
        </li>
        {/* Dark mode */}
        <li className="p-2 w-10 h-10 my-2 center cursor-pointer rounded-lg ">
          <DarkToggle />
        </li>
        <li
          onClick={handleLogout}
          data-tip="logout"
          className="p-2 w-10 tooltip tooltip-bottom cursor-pointer h-10 my-2 center rounded-lg"
        >
          <MdLogout className="h-6 w-6 " />
        </li>
      </ul>
      <div className="mt-auto center ">
        <img
          onClick={hanldeViewProfile}
          src={authUser.profilePic}
          alt="profile-picture"
          className="cursor-pointer rounded-lg w-10 h-10 object-cover"
        />
      </div>
    </section>
  );
};
