import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Navbar/Sidebar";
import Header from "../Navbar/Header";
const PrivateRouter = () => {
  const user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  return (
    <div>
      {user ? (
        <div className="flex gap-x-1 w-full">
          <Sidebar open={open} setOpen={setOpen} />
          <div className="h-screen overflow-y-auto overflow-x-hidden w-full relative pr-1">
            <Header setOpen={setOpen}/>
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
