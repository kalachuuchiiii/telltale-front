import Form from '../Components/Form.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [docFormat, setDocFormat] = useState({
    name: "", 
    password: ""
  })
  const [loading, setLoading] = useState(false);
  const [messageFormat, setMessageFormat] = useState({
    success: false, 
    message: ""
  });
  const nav = useNavigate();
  
  const handleChange = (e) => {
    setMessageFormat({});
    const { name, value } = e.target; 
    setDocFormat(prev => {
      return {
        ...prev, [name] : value 
      }
    })
  }
  
  const handleFormChange = async(e) => {
    e.preventDefault();
    setLoading(true);
    const { name, password } = docFormat;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {name, password}, { withCredentials: true })
      console.log({res})
      setMessageFormat({
        success: true, 
        message: res?.data?.message
      });
      setLoading(false);
      nav("/")
      window.location.reload();
    }catch(e){
      console.log({e})
      setMessageFormat({
        success: false, 
        message: e?.response?.data?.message || "Internal Server Error"
      });
      setLoading(false);
    }
  }
  
  return <div className = "absolute inset-0 flex justify-center items-center">
    <Form onFormSubmit = {handleFormChange} loading = {loading} messageFormat = {messageFormat}onChange = {handleChange} type = "Login" />
  </div>
}

export default Login; 