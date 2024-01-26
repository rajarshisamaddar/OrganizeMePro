import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupLayout from "./SignupLayout";
import LoginLayout from "./LoginLayout";
const AuthLayout = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState("/login");
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <div
      className={`${
        path === "/signup" ? "h-[110vh]" : "h-screen"
      } bg-cardBg w-full m-auto`}
    >
      {path === "/signup" && <SignupLayout navigate={navigate} />}
      {path === "/login" && <LoginLayout navigate={navigate} />}
    </div>
  );
};

export default AuthLayout;
