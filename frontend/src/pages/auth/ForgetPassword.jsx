import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useForgetPassword from "../../hooks/useForgetPassword";

const ForgetPassword = () => {
  const { loading, forgetPassword } = useForgetPassword();
  const [showForgetPassword, setshowForgetPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    forgetPassword(data.emailId).then((data) => {
      // if the status is success show the success page
      if (data.code === 200) setshowForgetPassword(false);
    });
  };
  return (
    <div className="absolute rounded-xl border-slate-500 dark:border-gray-500 shadow-md p-8 lg:w-[400px] lg:h-auto dark:bg-[#202029] bg-[#feffff]">
      <h2 className="text-primary-100 text-center font-bold text-3xl">
        Chat <span className="text-black dark:text-white"> App</span>
      </h2>
      <p className="text-center font-medium text-black dark:text-white text-xl mt-4">
        Forget Password?
      </p>
      <p className="text-center mt-2 mb-6 text-[15px] dark:text-gray-400 text-gray-800">
        No Problem, we will email you password reset instructions.
      </p>
      {showForgetPassword ? (
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
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
              <p className="text-red-500 text-xs mt-1">
                Email ID is required!.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-block cursor-pointer bg-primary-100 border-none text-white uppercase text-sm font-semibold hover:bg-slate-500"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              " Reset Password"
            )}
          </button>
        </form>
      ) : (
        <p className="text-center mt-2 mb-6 text-base font-medium dark:text-gray-400 text-gray-800">
          We have sent an reset password link to your email id. <br /> Please
          check your email.
        </p>
      )}
      <div className="text-sm font-medium text-right flex justify-between items-center text-primary-100 mt-6 ">
        <Link to="/auth/login" className="hover:underline  cursor-pointer">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
