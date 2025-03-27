import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dropdown from '../Components/Dropdown.jsx';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";;
import { AnimatePresence } from 'framer-motion';
import LogoutModal from '../Components/LogoutConfirmation.jsx';

const Navbar = ({ userInfo, isSessionLookingPending }) => {
  const name = userInfo?.name || "...";

  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const capitalizeFirstLetter = (name) => {
    const capital = name.charAt(0).toUpperCase(); 
    return `${capital}${name.substring(1)}`
  }
  
  const buttonStyle = "bg-neutral-50 rounded-lg text-gray-900 w-[130px] h-[36px] py-2 px-4 flex justify-center gap-2 items-center "
  


  return <div className=" text-sm p-5 shadow-lg flex justify-between w-full bg-black/85 text-neutral-100 z-20  items-center inset-x-0">
    <AnimatePresence>
          {
      isLogoutModalOpen && <LogoutModal  onClose = {() => setIsLogoutModalOpen(false)} />
    }
    </AnimatePresence>
    <NavLink to="/" className="text-lg  font-bold italic">TellTale</NavLink>
    <nav className="flex items-center  gap-4">
      <NavLink className="hover:underline cursor-pointer active:underline" to="/submit" >Submit</NavLink>
      <NavLink className="hover:underline cursor-pointer active:underline" to="/">Browse</NavLink>
      {
        isSessionLookingPending && Object.keys(userInfo).length === 0 ? <div className = {buttonStyle}>
          <MoonLoader size = "18" color = "black" />
        </div> : Object.keys(userInfo).length === 0 ? <NavLink className = {buttonStyle} to = "/login" >
          Login
        </NavLink> : <p onClick = {() => setIsDropDownOpen(true)} className = {buttonStyle}>{
          isDropdownOpen ? 
          <GoTriangleUp size = "20" color = "black" /> : 
          <GoTriangleDown size = "20" color = "black" /> 
        }{name}</p>
      }
      <AnimatePresence>
        {
          isDropdownOpen && <div className="w-full flex justify-center items-center fixed inset-x-0">
            <Dropdown setIsLogoutModalOpen = {setIsLogoutModalOpen} name = {name} onClose={() => setIsDropDownOpen(false)} />
          </div>
        }
      </AnimatePresence>
    </nav>

  </div>
}

export default Navbar;