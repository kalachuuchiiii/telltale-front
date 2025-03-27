
import { motion } from 'framer-motion';
import { fadeVariant } from '../variants/variant.js';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const LogoutConfirmation = ({onClose}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const nav = useNavigate();
  
  const handleLogout = async() => {
    setIsLoggingOut(true);
   try {
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {}, {withCredentials: true})
     
     if(res.data.success){
       nav("/");
       window.location.reload().then(() => {
         setIsLoggingOut(false);
       })
     }
   }catch(e){
     console.log({e})
   }
  }
  
  useEffect(() => {
    document.documentElement.style.overflow = "hidden"; 
    return() => {
      document.documentElement.style.overflow = ""; 
    }
  }, [])
  
  
  return <motion.div
  variants = {fadeVariant} 
  initial = "hidden" 
  animate = "visible" 
  exit = "hidden"
  onClick = {onClose}
  className = "flex flex-col gap-4 items-center justify-center inset-0 fixed bg-black/85 z-40 "
  >
    <div onClick = {e => e.stopPropagation()} className = "p-4 bg-black/90 rounded-lg flex flex-col gap-4 z-40 w-10/12">
      <h1 className = "text-lg font-bold ">Logout</h1>
      <p>Are you sure you want to log out? You’ll need to sign in again to access your notes.</p>
      <button onClick = {handleLogout} className = "p-2 bg-neutral-50 flex justify-center items-center text-gray-900 outline rounded-lg  hover:bg-neutral-600 hover:text-black ">{isLoggingOut ? <MoonLoader color = "white" size = "14"/> : "Logout"}</button>
    </div>
    <p className = "text-neutral-400 text-sm">Click anywhere outside to close.</p>
  </motion.div>
}

export default LogoutConfirmation;