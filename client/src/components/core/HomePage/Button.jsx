import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <button
        className={`w-full sm:w-auto rounded-md text-center text-[13px] sm:text-[16px] px-6 py-3 font-semibold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300
          ${
            active
              ? "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-black"
              : "bg-richblack-800 text-richblack-100"
          } 
          hover:shadow-none hover:scale-[0.97]`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
