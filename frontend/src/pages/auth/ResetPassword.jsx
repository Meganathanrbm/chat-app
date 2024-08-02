import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const { loading, resetPassword } = useResetPassword();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    resetPassword({
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
      token,
    }).then((data) => {
      if (data.code === 200) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/auth/login");
        }, 200);
      }
    });
  };
  return (
    <div className="absolute rounded-xl border-slate-500 dark:border-gray-500 shadow-md p-8 lg:w-[400px] lg:h-auto dark:bg-[#202029] bg-[#feffff]">
      <h2 className="text-primary-100 text-center font-bold text-3xl">
        Chat <span className="text-black dark:text-white"> App</span>
      </h2>
      <p className="text-center font-medium text-black dark:text-white text-xl mt-4">
        Create New Password
      </p>
      <p className="text-center mt-2 mb-8 text-[15px] dark:text-gray-400 text-gray-800">
        Pleace create your new password.
      </p>
      <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label
            htmlFor="newPassword"
            className="text-sm  my-12 dark:text-gray-400 text-gray-800 font-medium"
          >
            New Password
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
              {...register("newPassword", { required: true })}
              type="password"
              className="grow text-sm input-sm"
              placeholder="Enter New Password"
            />
          </label>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              Password is required! (minimum length 6 charecters).
            </p>
          )}
        </div>
        <div className="mt-3">
          <label
            htmlFor="Password"
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
              {...register("confirmPassword", { required: true })}
              type="password"
              placeholder="Enter Confirm passeword"
              className="grow text-base input-md"
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
          className="btn btn-block bg-primary-100 mt-4 border-none text-white uppercase text-sm font-semibold hover:bg-slate-500"
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "  Save Password"
          )}
        </button>
      </form>
      <div className="text-sm font-medium text-right flex justify-between items-center text-primary-100 mt-6 ">
        <Link to="/auth/login" className="hover:underline  cursor-pointer">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
