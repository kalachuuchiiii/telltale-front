import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dropdown from '../Components/Dropdown.jsx';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { AnimatePresence } from 'framer-motion';

const Navbar = ({ userInfo, isSessionLookingPending }) => {
  const name = userInfo?.name || "";

  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [isSessionRunning, setIsSessionRunning] = useState(false);

  useEffect(() => {
    setIsSessionRunning(Object.keys(userInfo).length > 0);
  }, [userInfo, userInfo?.name, name, userInfo?._id])


  return <div className=" text-sm p-5 shadow-lg flex justify-between w-full bg-black/85 text-neutral-100 z-20  items-center inset-x-0">
    <NavLink to="/" className="text-lg  font-bold italic">TellTale</NavLink>
    <nav className="flex items-center gap-2">
      <NavLink className="hover:underline cursor-pointer active:underline" to="/submit" >Submit</NavLink>
      <NavLink className="hover:underline cursor-pointer active:underline" to="/">Browse</NavLink>
      {
        isSessionLookingPending ? <MoonLoader size="16" color="white" /> : Object.keys(userInfo).length > 0 ? <p className="font-semibold text-neutral-300 italic" onClick={() => setIsDropDownOpen(prev => !prev)}>
          {name || ""}
        </p> : (!isSessionRunning || Object.keys(userInfo).length === 0) && <NavLink to="/login" className="hover:underline cursor-pointer active:underline"  >
          Login
        </NavLink>
      }
      <AnimatePresence>
        {
          isDropdownOpen && <div className="w-full flex justify-center items-center fixed inset-x-0">
            <Dropdown onClose={() => setIsDropDownOpen(false)} />
          </div>
        }
      </AnimatePresence>
    </nav>

  </div>
}

export default Navbar;