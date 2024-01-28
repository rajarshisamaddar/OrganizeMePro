import React from 'react'

const CrudLayout = ({children}) => {
  return (
    <div className="h-screen w-full fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-[100000]">
    <div className="flex h-full w-full justify-center items-center text-5xl text-white">
      <div className="h-fit w-[40%] md:w-[90%] m-auto bg-cardBg relative p-4 pb-6 rounded-md border border-border">
        {children}
      </div>
    </div>
  </div>
  )
}

export default CrudLayout
