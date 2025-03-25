import { motion } from 'framer-motion';

const PopUp = ({success, message}) => {
  
  return <motion.div
  initial = {{
    opacity: 0
  }}
  animate = {{
    opacity: 1
  }}
  exit = {{
    opacity: 0
  }}
  className = "fixed pointer-events-none flex justify-center w-11/12 z-30 top-2 mx-0" 
  >
    <p className = "text-neutral-50 $ bg-black/80 w-full p-4  rounded-lg" >
          {
      message || "Something unexpected occured"
    }
    </p>
  </motion.div>
}

export default PopUp;