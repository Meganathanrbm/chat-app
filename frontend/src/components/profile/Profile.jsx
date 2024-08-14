import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import { SocketContext } from "../../context/SocketContext";
import { formatDate } from "../../utils/formatDateTime";
import { useNavigate } from "react-router-dom";
import { useWidth } from "../../hooks/useWidth";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import useUpdateProfileAbout from "../../hooks/useUpdateProfileAbout";

export const Profile = () => {
  const [isAboutEdit, setIsAboutEdit] = useState(false);
  const { setViewProfile, viewProfile } = useConversation();
  const [aboutContent, setAboutContent] = useState();
  const { onlineUsers } = useContext(SocketContext);
  const { authUser } = useContext(AuthContext);
  const isOnline = onlineUsers?.includes(viewProfile?._id);
  const navigate = useNavigate();
  const width = useWidth();
  const { loading, updateProfileAbout } = useUpdateProfileAbout({
    setIsAboutEdit,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const closeProfile = () => {
    if (width) navigate(-1);
    setViewProfile(null);
  };
  const handleAboutText = (data) => {
    if (viewProfile?._id === authUser?._id) {
      updateProfileAbout(data);
    }
  };
  useEffect(() => {
    setAboutContent(viewProfile?.about);
  }, [viewProfile, isAboutEdit]);
  return (
    <section
      className=" h-full w-full md:min-w-[400px] lg:max-w-[500px] lg:min-w-[400px] 
    bg-chatContainer border-r dark:border-r-gray-800 flex flex-col overflow-hidden"
    >
      {/* header */}
      <div className="bg-messageHeader w-full flex items-center gap-4 px-5 sm:px-6 py-3 dark:border-b-gray-800 border-b">
        {/* close button */}
        <div onClick={closeProfile}>
          <IoClose className="text-2xl text-black dark:text-white cursor-pointer" />
        </div>
        <div className="flex justify-center items-center  rounded-lg">
          {/* profile picture for match the layout */}
          <div className="avatar">
            <div className="w-1 h-10 rounded-full"></div>
          </div>
          {/* username & last message */}

          <h4 className="font-semibold dark:text-slate-100 capitalize  text-black text-base">
            Contact Info
          </h4>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-3 border-b dark:border-b-gray-800  flex-col center">
        {/* profile picture */}
        <div className="avatar my-4">
          <div className=" w-48 rounded-full">
            <img src={viewProfile?.profilePic} />
          </div>
        </div>
        <h4 className="text-2xl font-normal capitalize text-black dark:text-white">
          {viewProfile?.fullname}
        </h4>
        <p className="text-base font-normal mb-1 text-slate-500 dark:text-slate-400">
          {viewProfile?.emailId}
        </p>
        <p className="text-base font-normal mb-1 text-slate-500 dark:text-slate-400">
          {viewProfile?.gender}
        </p>
      </div>
      <div className="px-5 sm:px-6 py-3 border-b dark:border-b-gray-800">
        <p className="text-base pb-2 ">
          {isOnline ? (
            <span className="text-green-500">Online</span>
          ) : (
            <span className="text-slate-500 dark:text-slate-400">Offline</span>
          )}
        </p>
      </div>
      {/* about */}
      <div className="px-5 sm:px-6 py-3 border-b dark:border-b-gray-800">
        <h4 className="text-black flex items-center dark:text-white text-lg mb-1">
          About
          {viewProfile?._id === authUser?._id && (
            <span
              onClick={() => setIsAboutEdit(true)}
              className="float-right ml-auto cursor-pointer"
            >
              <MdEdit />
            </span>
          )}
        </h4>
        <form action="" onSubmit={handleSubmit(handleAboutText)}>
          <textarea
            {...register("about", { maxLength: 100, required: true })}
            readOnly={!isAboutEdit}
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            className="text-slate-500 bg-transparent pt-0 mt-0 text-justify resize-none border-none overflow-hidden w-full break-words outline-none dark:text-slate-400 text-base"
          ></textarea>
          {errors.about && (
            <p className="text-red-500 text-xs mt-1">
              Maximum length is 100 Charecters.
            </p>
          )}
          {isAboutEdit && (
            <div className="flex items-center gap-6 mt-2">
              <button
                type="submit"
                className="btn btn-sm font-medium rounded-md bg-primary-100 text-slate-100 hover:bg-primary-100 outline-none border-none"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Save"
                )}
              </button>
              <button
                onClick={() => setIsAboutEdit(false)}
                className="btn btn-neutral  font-medium rounded-md text-sm btn-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="px-5 sm:px-6 py-3 border-b dark:border-b-gray-800">
        <p className="text-slate-500 dark:text-slate-400  text-base mb-1">
          Since {formatDate(viewProfile?.createdAt)}
        </p>
      </div>
    </section>
  );
};
