import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CTAButton from "../components/core/HomePage/Button";

const Error = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-richblack-900 px-4 text-center text-white">
      <h1 className="text-[120px] font-extrabold leading-none text-richblack-300">
        404
      </h1>
      <h2 className="text-4xl font-semibold mb-4">Oops! Page not found.</h2>
      <p className="mb-8 max-w-xl text-3xl font-semibold ">
        ⚠️{" "}
        <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">
          Work is under Construction. Please wait for its Completion
        </span>{" "}
        ⚠️
      </p>
      <CTAButton linkto={"/"} active={true}>
        <div className="flex items-center gap-4">
          <FaArrowLeft />
          Go Back Home
        </div>
      </CTAButton>
    </div>
  );
};

export default Error;
