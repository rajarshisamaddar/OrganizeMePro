import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../Navbar/Sidebar";
import Header from "../Navbar/Header";
import Loading from "../Loading/Loading";
import { setLoading, setUser } from "@/redux/slices/AuthSlice";
import { getUser } from "@/utils/userService";
const PrivateRouter = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = async () => {
    dispatch(setLoading(true));
    try {
      const userData = await getUser();
      if (userData) {
        dispatch(setUser(userData));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    userDetails();
    navigate("/");
  }, []);
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
