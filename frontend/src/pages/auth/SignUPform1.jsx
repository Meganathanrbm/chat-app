import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import useGenerateOTP from "../../hooks/useGenerateOTP";
import { useNavigate } from "react-router-dom";

const SignUPform1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { loading, generateOTP } = useGenerateOTP();
  const onSubmit = (data) => {
    sessionStorage.setItem("current-user-emailID", data.emailId);
    generateOTP(
      {
        emailId: data.emailId,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      "generateOTP"
    ).then((data) => {
      if (data.code == 200) {
        navigate("/auth/verifyOTP");
      }
    });
  };
  return (
    <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label
          htmlFor="EmailId"
          className="text-sm  my-12 dark:text-gray-400 text-gray-800 font-medium"
        >
          Email Id
        </label>
        <label className="input input-bordered input-md text-gray-800 dark:text-white dark:bg-[#1C222A] bg-slate-100 flex items-center mt-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            {...register("emailId", { required: true })}
            type="email"
            className="grow text-sm input-sm"
            placeholder="Enter EmailId"
          />
        </label>
        {errors.emailId && (
          <p className="text-red-500 text-xs mt-1">EmailID is required!.</p>
        )}
      </div>

      <div className="mt-3">
        <label
          htmlFor="Password"
          className="text-sm  my-12 dark:text-gray-400 text-gray-800 font-medium"
        >
          Password
        </label>
        <label className="input input-bordered input-md text-gray-800 dark:text-white dark:bg-[#1C222A] bg-slate-100 flex items-center mt-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            className="grow text-sm input-sm"
            placeholder="Enter password"
          />
        </label>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            Password is required! (minimum length 6 charecters).
          </p>
        )}
      </div>
      <div className="mt-3">
        <label
          htmlFor="Confirm-Password"
          className="text-sm  my-12 dark:text-gray-400 text-gray-800 font-medium"
        >
          Confirm Password
        </label>
        <label className="input input-bordered input-md text-gray-800 dark:text-white dark:bg-[#1C222A] bg-slate-100 flex items-center mt-2 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            {...register("confirmPassword", { required: true, minLength: 6 })}
            type="password"
            className="grow text-sm input-sm"
            placeholder="Enter confirm password"
          />
        </label>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            Confirm Password is required! (minimum length 6 charecters).
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-block mt-8 bg-primary-100 border-none text-white uppercase text-sm font-semibold hover:bg-slate-500"
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "SIGN UP"
        )}
      </button>
    </form>
  );
};

export default SignUPform1;
