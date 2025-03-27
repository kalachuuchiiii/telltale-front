export const fadeVariant = {
   hidden: {
     opacity:0
   },
     visible: {
       opacity: 1
     }
}

export const slideFromTopVariant = {
  hidden: {
    opacity: 0,
    y: 0
  }, 
  visible: {
    opacity: 1,
    y: "15%",
    transition: {
      type: 'tween'
    }
  }
}