import React, { useContext, useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import profilePic from "../../assets/images/profile-pic.jpg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import useLogOut from "../../hooks/useLogOut";
import { AuthContext } from "../../context/AuthContext";

export const SidePanel = () => {
  const [darkToggle, setDarkToggle] = useState(false);
  const { loading, logout } = useLogOut();
  const { authUser } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (darkToggle) {
      document.documentElement.classList.toggle("dark");
    } else {
      document.documentElement.classList.toggle("dark");
    }
  }, [darkToggle]);

  return (
    <section className="h-full w-[75px] border-r dark:border-r-gray-800 flex-col shrink-0 p-4 bg-sidePanel hidden lg:flex ">
      <ul className="flex flex-col items-center justify-center h-full">
        <li className="p-2 w-10 h-10 my-2 center rounded-lg bg-primary-100 text-white cursor-pointer">
          <IoChatbubbleEllipsesOutline className="h-6 w-6 " />
        </li>
        {/* Dark mode */}
        <li className="p-2 w-10 h-10 my-2 center cursor-pointer rounded-lg bg-slkate-500">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={() => setDarkToggle((prev) => !prev)}
              value={darkToggle}
            />

            {/* sun icon */}
            <svg
              className="swap-on h-6 w-6 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-6 w-6 text-gray-800 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </li>
        <li className="p-2 w-10 h-10 my-2 center rounded-lg">
          <IoSettingsOutline className="h-6 w-6 " />
        </li>
      </ul>
      <div className="mt-auto center dropdown dropdown-right dropdown-top">
        <div role="button" tabIndex={0} className="">
          <img
            src={authUser.profilePic}
            alt="profile-picture"
            className="cursor-pointer rounded-lg w-10 h-10 object-cover"
          />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content rounded-md bg-messageContent text-base text-primary-content z-[100] w-32 shadow-sm border dark:border-gray-700"
        >
          <li className="text-black capitalize dark:text-slate-100 flex items-center  gap-2 px-4 py-2 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700">
            <FaUser className="text-sm" /> Profile
          </li>
          <li
            onClick={handleLogout}
            className="text-black capitalize dark:text-slate-100 flex items-center  gap-2 px-4 py-2 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            <MdLogout className="text-base font-semibold" /> Logout
          </li>
        </ul>
      </div>
    </section>
  );
};
