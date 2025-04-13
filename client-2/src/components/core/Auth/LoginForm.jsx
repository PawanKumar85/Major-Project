import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../../services/operations/authAPI";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      {/* Email Input */}
      <label className="w-full">
        <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 shadow-inner outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-50"
        />
      </label>

      {/* Password Input */}
      <label className="relative w-full">
        <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-md bg-richblack-800 p-3 pr-12 text-richblack-5 shadow-inner outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-50"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-10 cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>

        {/* Forgot Password Link */}
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto w-fit text-xs text-blue-100 hover:underline">
            Forgot Password?
          </p>
        </Link>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 rounded-md bg-blue-200 py-2 px-4 font-semibold text-richblack-900 transition-colors duration-200 hover:bg-yellow-100"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
