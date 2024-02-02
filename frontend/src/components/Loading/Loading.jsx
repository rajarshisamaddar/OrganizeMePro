import React from "react";

import LoadingImage from '@/assets/loading.svg'
const Loading = () => {
  return (
    <div className="h-screen w-full bg-cardBg border border-border flex justify-center items-center">
      <img src={LoadingImage} alt="" className="h-14 w-14" />
      <h2 className="mt-2 text-lg font-semibold">loading...</h2>
    </div>
  );
};

export default Loading;
