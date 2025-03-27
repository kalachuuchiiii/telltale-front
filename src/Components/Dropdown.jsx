import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { slideFromTopVariant } from '../variants/variant.js';


const Dropdown = ({onClose, name, setIsLogoutModalOpen}) => {
  const [isCopied, setIsCopied] = useState(false);

  const nav = useNavigate();
  const hover = "p-3 duration-200 w-full hover:bg-black/95";
  
  
  const handleShareLink = () => {
    if(isCopied)return;
    navigator.clipboard.writeText(`http://localhost:5173/u/${name}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3500)
  }
  
  const handleNavigate = (getRoute) => {
    nav(getRoute);
    onClose();
  }
  
  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  }
  
  

  
  return <div className = " fixed inset-0" onClick = {onClose}>
    <motion.div
  variants = {slideFromTopVariant} 
  initial = "hidden" 
  animate = "visible" 
  exit = "hidden" 
  className = "w-full inset-x-0 absolute flex justify-center items-center top-[70px]"
  onClick = {e => e.stopPropagation()}
  >
    <section className = "overflow-hidden flex items-center  flex-col bg-black/85 w-10/12 rounded-lg">
          <button onClick = {handleOpenLogoutModal} className = {hover}>
      Logout
    </button>
    <button className = {hover} onClick = {() => handleNavigate("/received-notes")} >
      Notes for you
    </button>
      <button className = {hover} onClick = {() => handleNavigate("submit-history")} >
        Submitted notes
      </button >

    <button onClick = {handleShareLink} className = {hover}>
      {
        isCopied ? "Link Copied!" : "Share your link"
      }
    </button>
    <button onClick = {onClose} className = {hover}>
      Close
    </button>
    </section>
  </motion.div>
  </div>
}

export default Dropdown;
