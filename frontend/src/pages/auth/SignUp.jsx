import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

const SignUpScreen1 = ({ setNextBtn, setUserInput, userInput }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setNextBtn(true);
    setUserInput({
      ...userInput,
      emailId: data.emailId,
      password: data.password,
      confirmPassword: data.confirmPassword,
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
        NEXT
      </button>
    </form>
  );
};

const SignUpScreen2 = ({ setNextBtn, setUserInput, userInput }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, signup } = useSignUp();
  const onSubmit = async (data) => {
    setNextBtn(true);
    await signup({ ...userInput, ...data });
  };

  return (
    <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        <label
          htmlFor="EmailId"
          className="text-sm  my-12 dark:text-gray-400 text-gray-800 font-medium"
        >
          Fullname
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
            {...register("fullname", { required: true })}
            type="text"
            className="grow input-sm text-sm"
            placeholder="Enter Fullname"
          />
        </label>
        {errors.fullname && (
          <p className="text-red-500 text-xs mt-1">Fullname is required!.</p>
        )}
      </div>

      <div className="mt-3">
        <label
          htmlFor="Password"
          className="text-sm  my-12 dark:text-gray-400 text-gray-800 font-medium"
        >
          Mobile No.
        </label>
        <label className="input input-bordered input-md text-gray-800 dark:text-white dark:bg-[#1C222A] bg-slate-100 flex items-center mt-2 gap-2">
          <PhoneInput
            placeholder="Enter phone number"
            value={"91"}
            className="grow text-sm "
            {...register("mobile", { required: true })}
          />
        </label>

        {errors.mobile && (
          <p className="text-red-500 text-xs mt-1">Mobile no. is required!.</p>
        )}
      </div>
      <div className="mt-3">
        <label
          htmlFor="Confirm-Password"
          className="text-sm  my-12 dark:text-gray-400 text-gray-800 font-medium"
        >
          Gender
        </label>
        <label className="  flex items-center mt-2 justify-evenly">
          <p className="center gap-2  text-base text-black dark:text-white font-medium">
            <input
              type="radio"
              name="gender"
              value="male"
              {...register("gender", { required: true })}
              className="radio-sm cursor-pointer radio-primary"
            />
            Male
          </p>

          <p className="center gap-2  text-base text-black dark:text-white font-medium">
            <input
              type="radio"
              name="gender"
              value="female"
              {...register("gender", { required: true })}
              className="radio-sm cursor-pointer radio-primary"
            />
            Female
          </p>
        </label>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            Confirm Password is required!.
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

const SignUp = () => {
  const [nextBtn, setNextBtn] = useState(false);
  const [userInput, setUserInput] = useState({
    emailId: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="absolute rounded-xl border-slate-500 dark:border-gray-500 shadow-md p-8 lg:w-[400px] lg:h-auto dark:bg-[#202029] bg-[#feffff]">
      <h2 className="text-primary-100 text-center font-bold text-3xl">
        Chat <span className="text-black dark:text-white"> App</span>
      </h2>
      <p className="text-center font-medium text-black dark:text-white text-xl mt-4">
        Signup
      </p>
      <p className="text-center mt-2 mb-6 text-[15px] text-wrap md:text-nowrap dark:text-gray-400 text-gray-800">
        Create your free account to join the conversation.
      </p>
      {nextBtn ? (
        <SignUpScreen2
          setNextBtn={setNextBtn}
          userInput={userInput}
          setUserInput={setUserInput}
        />
      ) : (
        <SignUpScreen1
          setNextBtn={setNextBtn}
          userInput={userInput}
          setUserInput={setUserInput}
        />
      )}
      <div className="text-sm font-medium text-right flex justify-between items-center text-primary-100 mt-6 ">
        <Link to="/auth/login" className="hover:underline  cursor-pointer">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
