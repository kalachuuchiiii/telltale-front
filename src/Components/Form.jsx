import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Form = ({onChange, loading, messageFormat, type, onFormSubmit}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const { message, success } = messageFormat; 
  
  if(!type){
    return <MoonLoader />
  }
  
  useEffect(() => {
    setIsRegister(type === "Register");
  }, [type])
  
  
  
  
  return <form onSubmit = {onFormSubmit} className = "p-8 rounded-lg shadow-lg flex flex-col gap-4" >
    <p className = "p-2 pl-0 text-lg font-bold">{type}</p>

          <section className = "flex-col flex">
      <label className = "text-sm">Username</label>
          <input onChange = {onChange} name = "name" className = "p-2 shadow-lg rounded " />
    </section>
    <section className = "flex-col flex">
      <label className = "text-sm">Password</label>
        <section className = "flex">
                    <input type = {isPasswordShowing ? "text" : "password"} onChange = {onChange} name = "password" className = "p-2 shadow-lg rounded " />
                    <div className = "p-2 z-10 pr-0" onClick = {() => setIsPasswordShowing(prev => !prev)}>
                      {
                        isPasswordShowing ? <FaRegEye size = "24"/> : <FaRegEyeSlash size = "24"/>
                      }
                    </div>
        </section>
    </section>
    <div className = "h-2">
          {
      message && <p className = {`text-xs ${success ? "text-blue-400" : "text-red-500"} `}>{message}</p>
    }
    </div>
    <div className = "text-sm">
      {
        isRegister ? <p>
          Alreasy have an account? <NavLink to = "/login" className = "hover:underline text-blue-500">Login</NavLink>
        </p> : <p>
          Doesnt have an account? <NavLink to = "/register" className = "hover:underline text-blue-500">Register</NavLink>
        </p>
      }
    </div>
    <button type = "submit" className = "p-2 bg-black/85 min-h-10 flex items-center justify-center duration-200  text-neutral-50 rounded-lg">
      {loading ? <MoonLoader size = "18" color = "white" /> : type}
    </button>
  </form>
  
}

export default Form; 