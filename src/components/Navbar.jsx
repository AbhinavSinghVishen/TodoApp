import React, { useTransition } from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="flex bg-indigo-500 text-white h-16">
        <div className="logo font-bold text-4xl ml-5 mt-2">
            iTask
        </div>
        <div className="w-310 "></div>
        <div className="list mt-5">
            <ul className='flex'>
                <li><div className='cursor-pointer hover:font-bold transition-all duration-100 h-7 w-12 ml-2 flex justify-center'><div>Home</div></div></li>
                <li><div className='cursor-pointer hover:font-bold transition-all duration-100 h-7 w-22 ml-2 flex justify-center'><div>Your Tasks</div></div></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
