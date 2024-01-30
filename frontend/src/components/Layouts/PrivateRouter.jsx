import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../Navbar/Sidebar";
import Header from "../Navbar/Header";
import Loading from "../Loading/Loading";
import { getCategory } from "@/utils/categoryService";
import { setCategory } from "@/redux/slices/categorySlice";
const PrivateRouter = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const getAllCategory = async () => {
    const categories = await getCategory();
    if (categories) {
      dispatch(setCategory(categories));
    }
  };
  useEffect(() => {
    if (user) {
      getAllCategory();
    }
  }, [user]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {user ? (
        <div className="flex gap-x-1 w-full">
          <Sidebar open={open} setOpen={setOpen} />
          <div className="h-screen overflow-y-auto overflow-x-hidden w-full m-auto relative pr-1 md:pr-0">
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
