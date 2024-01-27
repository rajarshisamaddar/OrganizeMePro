import React, { useEffect } from "react";
import { IoMoon } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "@/redux/slices/AuthSlice";
import { MdSunny } from "react-icons/md";
const Themetoggle = () => {
  const theme = useSelector((state) => state.auth.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!theme) {
      dispatch(
        toogleTheme(
          window.matchMedia("(prefers-colors-schema:dark)").matches
            ? "dark"
            : "light"
        )
      );
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const hanleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    dispatch(toogleTheme(newTheme));
  };
  return (
    <div
      className="md:text-xl text-2xl flex md:bg-background md:h-[2.9rem] md:w-[2.9rem] sm:h-8 sm:w-8 rounded-full 
      justify-center items-center md:hover:bg-primaryColor transition-transition cursor-pointer md:border border-border"
      onClick={hanleTheme}
    >
      {theme === "dark" ? (
        <IoMoon className="text-indigo-400" />
      ) : (
        <MdSunny className="text-yellow-500" />
      )}
    </div>
  );
};

export default Themetoggle;
