import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Navbar/Sidebar";
const PrivateRouter = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      {user ? (
        <div className="flex gap-x-4 w-full">
          <Sidebar />
          <div className="h-screen overflow-y-auto overflow-x-hidden w-full p-2">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default PrivateRouter;
