import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiMenu2Fill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMoon } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import avatar from "@/assets/avatar.jpg";
const Header = ({ setOpen }) => {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <div className="w-full bg-cardBg md:fixed md:top-0 md:left-0 md:right-0 p-3 my-[.2rem] md:my-0 border border-border">
      <div className="flex justify-between w-full h-full items-center">
        <div
          className="text-xl text-primaryColor hidden md:flex cursor-pointer h-[2.9rem] w-[2.9rem] sm:h-8 sm:w-8 bg-background 
          justify-center items-center rounded-md hover:bg-primaryColor hover:text-cardBg border border-border"
          onClick={() => setOpen(true)}
        >
          <RiMenu2Fill />
        </div>

        <div
          className={`md:absolute md:top-[110%] ${
            openSearch ? "md:right-[.3rem]" : "md:right-[-110%]"
          } w-[30%] rounded-borderRadius p-2 px-4 md:w-[50%] sm:w-[80%]
          transition-transition
        flex gap-x-2 bg-background items-center md:bg-cardBg`}
        >
          <CiSearch className="text-xl text-primaryColor font-bold" />
          <input
            type="search"
            name=""
            id=""
            className="w-full bg-transparent p-1 outline-none"
            placeholder="Search"
          />
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden md:flex text-xl bg-background h-[2.9rem] w-[2.9rem] sm:h-8 sm:w-8 rounded-full text-primaryColor justify-center items-center
          hover:bg-primaryColor transition-transition cursor-pointer hover:text-cardBg border border-border"
            onClick={() => setOpenSearch((prev) => !prev)}
          >
            {openSearch ? <RxCross2 /> : <IoSearchOutline />}
          </div>
          <div className="flex items-center gap-4 md:gap-3 cursor-pointer">
            <div
              className="md:text-xl text-2xl flex md:bg-background md:h-[2.9rem] md:w-[2.9rem] sm:h-8 sm:w-8 rounded-full 
              text-gray-500 justify-center items-center
              md:hover:bg-primaryColor transition-transition cursor-pointer md:hover:text-cardBg md:border border-border"
            >
              <IoMoon />
            </div>
            <div
              className="md:text-xl text-2xl flex md:bg-background md:h-[2.9rem] md:w-[2.9rem] sm:h-8 sm:w-8 rounded-full 
              text-gray-500 
              justify-center items-center md:hover:bg-primaryColor transition-transition cursor-pointer 
              md:hover:text-cardBg md:border border-border"
            >
              <IoSettingsOutline />
            </div>

            <div className="flex items-center gap-2">
              <img
                src={avatar}
                alt=""
                className="h-12 w-12 sm:h-10 sm:w-10 rounded-full border border-border"
              />
              <h1 className="sm:hidden text-sm font-semibold">
                Soumayadip Saha
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
