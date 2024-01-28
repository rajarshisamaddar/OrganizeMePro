import React, { useState, useEffect } from "react";
import axiosCustom from "../utils/axiosCustom";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosCustom.get("/category/get-all-categories");
      setData(result.data.categories[0]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>{data && data.title}</p>
    </div>
  );
};

export default Home;
