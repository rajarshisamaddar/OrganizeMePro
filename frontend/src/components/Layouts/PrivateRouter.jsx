import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Navbar/Sidebar";
import Header from "../Navbar/Header";
import Loading from "../Loading/Loading";
const PrivateRouter = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {user ? (
        <div className="flex gap-x-1 w-full">
          <Sidebar open={open} setOpen={setOpen} />
          <div className="h-screen overflow-y-auto overflow-x-hidden w-full relative pr-1">
            <Header setOpen={setOpen} />
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
