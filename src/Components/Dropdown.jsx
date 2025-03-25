import { motion } from 'framer-motion';
import { fadeVariant } from '../variants/variant.js';
import axios from 'axios';

const Dropdown = ({onClose}) => {
  
  const hover = "p-3 duration-200 w-full hover:bg-black/95";
  
  const handleLogout = async() => {
   try {
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {}, {withCredentials: true})
     console.log({res})
     if(res.data.success){
       window.location.reload();
     }
   }catch(e){
     console.log({e})
   }
  }

  
  return <motion.div
  variants = {fadeVariant} 
  initial = "hidden" 
  animate = "visible" 
  exit = "hidden" 
  className = "w-full inset-x-0 absolute flex justify-center items-center top-16">
    <section className = "overflow-hidden flex items-center  flex-col bg-black/85 w-10/12 rounded-lg">
          <button onClick = {handleLogout} className = {hover}>
      Logout
    </button>
    <button className = {hover} >
      Notes for you
    </button>
    <button className = {hover}>
      Submitted notes
    </button>
    <button className = {hover}>
      Share your link
    </button>
    <button onClick = {onClose} className = {hover}>
      Close
    </button>
    </section>
  </motion.div>
}

export default Dropdown;
