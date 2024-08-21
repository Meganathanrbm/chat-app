import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGenerateOTP from "../../hooks/useGenerateOTP";
import useVerifyOTP from "../../hooks/useVerifyOTP";
import useUser from "../../zustand/useUser";

const OTPverify = () => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRef = useRef([]);
  const { generateOTP } = useGenerateOTP();
  const { loading, verifyOTP } = useVerifyOTP();
  const navigate = useNavigate();
  const { setIsVerify } = useUser();
  const emailId = sessionStorage.getItem("current-user-emailID");

  const handleChange = (val, i) => {
    if (isNaN(val)) return;
    let newOtp = [...otp];
    // last value / last charecter
    newOtp[i] = val.substring(val.length - 1);
    setOTP(newOtp);
    // move focus to next inputfield
    if (i < 3 && val && inputRef.current[i + 1]) {
      inputRef.current[i + 1].focus();
    }
    const completeOtp = newOtp.join("");
    // trigger submit
    if (completeOtp.length === 4) {
      verifyOTP({ emailId: emailId, otp: completeOtp }).then((data) => {
        if (data) {
          sessionStorage.setItem("current-user-emailID", data.emailId);
          setIsVerify(true);
          navigate("/auth/signup");
        }
      });
    }
  };
  const handleClick = (i) => {
    inputRef.current[i].setSelectionRange(1, 1);
  };
  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && i > 0 && inputRef.current[i - 1] && !otp[i]) {
      inputRef.current[i - 1].focus();
    }
  };
  const handleResendOTP = () => {
    generateOTP({ emailId }, "resendOTP");
    setOTP(["", "", "", ""]);
    inputRef.current[0].focus();
  };

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  return (
    <div className="absolute rounded-xl border-slate-500 dark:border-gray-500 shadow-md p-8 lg:w-[400px] lg:h-auto dark:bg-[#202029] bg-[#feffff]">
      <h2 className="text-primary-100 text-center font-bold text-3xl">
        Chat <span className="text-black dark:text-white"> App</span>
      </h2>
      <p className="text-center font-medium text-black dark:text-white text-xl mt-4">
        Verify Account
      </p>
      <p className="text-center mt-2 mb-8 text-[15px] text-wrap md:text-nowrap capitalize dark:text-gray-400 text-black">
        Enter the verification code send to your <br /> email ID
        <span className=" text-sm ml-1 lowercase font-medium dark:text-slate-300 text-gray-500 ">
          {emailId}
        </span>
      </p>
      <div className="center mb-4 gap-4">
        {otp.map((val, i) => (
          <input
            key={i}
            ref={(input) => (inputRef.current[i] = input)}
            value={val}
            onChange={(e) => handleChange(e.target.value, i)}
            onClick={() => handleClick(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            type="text"
            className="w-10 h-10 rounded-md text-lg font-medium text-black
              dark:text-slate-50 dark:bg-gray-950 text-center bg-gray-200"
          />
        ))}
      </div>

      <button
        onClick={handleChange}
        type="submit"
        className="btn btn-block my-4 bg-primary-100 border-none text-white uppercase text-sm font-semibold hover:bg-slate-500"
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Verify"
        )}
      </button>
      <p className="text-center   mb-4 mt-2 text-sm  dark:text-gray-400 text-gray-500">
        Didn't Receive the Code?
        <button
          onClick={handleResendOTP}
          className="hover:underline font-medium ml-1 text-primary-100 cursor-pointer"
        >
          Resend
        </button>
      </p>
      <div className="text-sm font-medium text-right flex justify-between items-center text-primary-100 mt-6 ">
        <Link to="/auth/login" className="hover:underline  cursor-pointer">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default OTPverify;
