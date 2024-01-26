import React from "react";
import LoginImage from "@/assets/login.webp";
import { Outlet } from "react-router-dom";
const LoginLayout = ({navigate}) => {
  return (
    <div className="grid grid-cols-[1fr,1.2fr] h-full w-full md:grid-cols-1">
      <div className="h-full flex justify-center items-center">
        <div className="w-[60%] sm:w-[90%] lg:w-[70%] md:w-[60%] p-5 h-fit flex justify-center items-center rounded-lg flex-col gap-8">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-2xl text-primaryColor">Welcome Back</h1>
            <h3 className="text-base text-gray-600">Login to Continue</h3>
          </div>
          <div className="w-full h-full flex flex-col justify-center gap-4">
            <Outlet />

            <div className="flex items-center gap-x-2 text-sm">
              <p>Don't have an account ? </p>
              <p
                onClick={() => navigate("/signup")}
                className="text-blue-600 underline cursor-pointer"
              >
                Register
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center bg-background md:hidden">
        <img src={LoginImage} alt="" className="h-[70%] w-[70%]" />
      </div>
    </div>
  );
};

export default LoginLayout;
