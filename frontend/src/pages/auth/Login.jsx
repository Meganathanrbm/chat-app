import React from "react";
import BackgroundDesign from "../../components/ui/BackgroundDesign";

import DarkToggle from "../../components/ui/DarkToggle";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useLogIn from "../../hooks/useLogIn";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, login } = useLogIn();

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div className="absolute rounded-xl border-slate-500 dark:border-gray-500 shadow-md p-8 lg:w-[400px] lg:h-auto dark:bg-[#202029] bg-[#feffff]">
      <h2 className="text-primary-100 text-center font-bold text-3xl">
        Chat <span className="text-black dark:text-white"> App</span>
      </h2>
      <p className="text-center font-medium text-black dark:text-white text-xl mt-4">
        Login
      </p>
      <p className="text-center mt-2 mb-8 text-[15px] dark:text-gray-400 text-gray-800">
        Enter your username and password to login.
      </p>
      <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label
            htmlFor="emailid"
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
              placeholder="Enter Email Id"
            />
          </label>
          {errors.emailId && (
            <p className="text-red-500 text-xs mt-1">Email ID is required!.</p>
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
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter passeword"
              className="grow text-base input-md"
            />
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">Password is required!.</p>
          )}
        </div>

        <div className="text-sm font-medium text-right flex justify-between items-center text-primary-100 my-6 ">
          <Link to="/auth/signup" className="hover:underline  cursor-pointer">
            Don't have an account?
          </Link>
          <p className="hover:underline  cursor-pointer">Forget Password?</p>
        </div>
        <button
          type="submit"
          className="btn btn-block bg-primary-100 border-none text-white uppercase text-sm font-semibold hover:bg-slate-500"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Login"
          )}
        </button>
        {/* <p className="text-sm font-medium text-center text-primary-100 mt-6 hover:underline  cursor-pointer">
          Forget Password?
        </p> */}
      </form>
    </div>
  );
};

export default Login;
