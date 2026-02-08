import React, { useContext } from 'react'
import { GlobalContext } from "../Context/GlobalContext"
export default function Nav() {
  const { appName}  = useContext(GlobalContext);
  return (
    <div className=' fixed top-0 left-0 w-full bg-primary text-secondary'>
      <div>
        {/* logo later */}
        {/* <img src="" alt="" /> */}

        {/* Project Name */}
        <h1 className=' text-secondary font-bold text-2xl pl-3 py-3'>{appName}</h1>
      </div>
    </div>
  )
}
