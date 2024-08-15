import React, { useContext, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchSharp } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import useConversation from "../../zustand/useConversation";
import useLogOut from "../../hooks/useLogOut";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const ChatHeader = ({ searchInput, searchRef, setSearchInput }) => {
  const { authUser, darkToggle, setDarkToggle } = useContext(AuthContext);
  const { logout } = useLogOut();
  const { setViewProfile } = useConversation();

  const handleLogout = async () => {
    await logout();
  };
  const hanldeViewProfile = () => {
    setViewProfile(authUser);
  };
  const handleTheme = () => {
    setDarkToggle((prev) => !prev);
  };
  const hanldeClearSearch = () => {
    setSearchInput("");
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkToggle);
  }, [darkToggle]);
  return (
    <div className="px-6 py-3 sm:py-4">
      {/* Title */}
      <div className="flex justify-between items-center mb-4 py-3">
        <h3 className="font-semibold text-primary-100 text-2xl capitalize">
          Messages
        </h3>
        {/* three Dots */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} className="">
            <BsThreeDotsVertical className="h-6 w-6 cursor-pointer text-black dark:text-white" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content border dark:border-gray-800 bg-slate-100 menu dark:bg-base-100 rounded-lg z-[1] w-40 p-2 shadow"
          >
            <li
              onClick={hanldeViewProfile}
              className="text-black text-base capitalize dark:text-slate-50 "
            >
              <Link to={`/profile/${authUser?.fullname}`}>Profile</Link>
            </li>
            <li
              onClick={handleTheme}
              className="text-black text-base capitalize dark:text-slate-50 "
            >
              <a>Theme</a>
            </li>
            <li
              onClick={handleLogout}
              className="text-black text-base capitalize dark:text-slate-50 "
            >
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Search */}
      <label className="input input-bordered input-md text-gray-800 dark:text-white dark:bg-[#1C222A] bg-slate-100 flex items-center mt-2 gap-2">
        <IoSearchSharp className="w-5 h-5 text-slate-500 text-base" />
        <input
          ref={searchRef}
          type="text"
          name="searchText"
          className="grow input-md text-base placeholder:text-slate-500"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {searchInput.length > 0 && (
          <HiMiniXMark
            onClick={hanldeClearSearch}
            className="w-5 h-5 text-slate-500 cursor-pointer text-base"
          />
        )}
      </label>
    </div>
  );
};
