import Form from '../Components/Form.jsx';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [docFormat, setDocFormat] = useState({
    name: "", 
    password: ""
  })
  const [messageFormat, setMessageFormat] = useState({
    success: false, 
    message: ""
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setMessageFormat({});
    const { name, value } = e.target; 
    setDocFormat(prev => {
      return {
        ...prev, [name] : value 
      }
    })
  }
  
  const handleFormSubmit = async(e) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);
    try {
      const { name, password } = docFormat;
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {name, password}, { withCredentials: true })
      console.log({res});
      setMessageFormat({
        success: true, 
        message: res.data.message
      });
      setLoading(false);
    }catch(e){
      console.log({e})
      setMessageFormat({
        success: false, 
        message: e.response.data.message || "Internal Server Error"
      });
      setLoading(false);
    }
  }
  
  
  
  return <div className = "absolute inset-0 flex justify-center items-center">
    <Form loading = {loading} messageFormat = {messageFormat} onFormSubmit = {handleFormSubmit} onChange = {handleChange} type = "Register" />
  </div>
}

export default Register; 