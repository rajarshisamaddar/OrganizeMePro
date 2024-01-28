import React, { useState, useEffect } from "react";
import axiosCustom from "../utils/axiosCustom";
import AddTopics from "@/components/Topics/AddTopics";
import { getCategory } from "@/utils/categoryService";
import { useDispatch } from "react-redux";
import { addCategory, setCategory } from "@/redux/slices/categorySlice";
const Home = () => {
  const dispatch = useDispatch();
  const getAllCategory = async()=>{
    const categories = await getCategory();
    // console.log(categories);
    if(categories){
      dispatch(setCategory(categories));
    }
  }
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div>
      <AddTopics />
      <p></p>
    </div>
  );
};

export default Home;
