import React from "react";
import SignupImage from "@/assets/signup.png";
import {Outlet } from "react-router-dom";
const SignupLayout = ({navigate}) => {
  return (
    <div className="grid grid-cols-[1.2fr,1fr] h-full w-full md:grid-cols-1">
      <div className="flex justify-center items-center bg-background md:hidden">
        <img src={SignupImage} alt="signup" className="h-[70%] w-[70%]" />
      </div>
      <div className="h-full flex justify-center items-center">
        <div className="w-[65%] sm:w-[90%] lg:w-[70%] md:w-[60%] p-5 h-fit flex justify-center items-center rounded-lg flex-col gap-5">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-2xl text-primaryColor">Zenflow</h1>
            <h3 className="text-gray-600 text-sm">
              Register to manage your task
            </h3>
          </div>
          <div className="w-full h-full flex flex-col justify-center gap-4">
            <Outlet />

            <div className="flex items-center gap-x-2 text-sm">
              <p>Already have an account ? </p>
              <p
                onClick={() => navigate("/login")}
                className="text-blue-600 underline cursor-pointer"
              >
                Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLayout;
