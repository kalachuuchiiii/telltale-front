import { NavLink } from 'react-router-dom';

const Navbar = () => {
  
  return <div className = " text-sm p-5 shadow-lg flex justify-between w-full bg-black/85 text-neutral-100 z-10 items-center inset-x-0">
    <NavLink to = "/" className = "text-lg  font-bold italic">TellTale</NavLink>
    <nav className = "flex gap-2">
      <NavLink className = "hover:underline cursor-pointer active:underline" to = "/submit" >Submit</NavLink>
      <NavLink className = "hover:underline cursor-pointer active:underline" to = "/">Browse</NavLink>
    </nav>
  </div>
}

export default Navbar;