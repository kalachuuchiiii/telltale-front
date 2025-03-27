import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import PopUp from '../Components/popUp.jsx';
import { Loading } from '../Components/Loading.jsx';

const UserSubmit = () => {
  const [receiverInfo, setReceiverInfo] = useState({});
  const [message, setMessage] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState("");
  const textAreaRef = useRef(null);
  const { name } = useParams();
  
  
  const handleGetUserInfoByName = async() => {
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-userinfo-by-name/${name}`);
      console.log({res})
      const { userInfo } = res.data; 
      setReceiverInfo(userInfo || {});
    }catch(e){
      console.log({e})
    }
  }
  
  useEffect(() => {
    handleGetUserInfoByName();
  }, [name])
  
  useEffect(() => {
    const textRef = textAreaRef.current; 
    if(textRef){
      textRef.style.height = "auto"
      textRef.style.height = `${textRef.scrollHeight}px`
    }
  }, [message])
  
  const handleSendNote = async() => {
    const { _id } = receiverInfo;
    try{
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-specific-note`, {id: _id, message }); 
      if(res.data.success){
        setIsPopUpOpen(true);
        setPopUpMsg(res.data.message || "Internal Server Error")
        setMessage("");
      }
      console.log({res});
    }catch(e){
      setIsPopUpOpen(true);
      setPopUpMsg(e.response.data.message || "Internal Server Error")
      console.log({e})
      
    }
    setTimeout(() => {
      setIsPopUpOpen(false);
      setPopUpMsg("");
      
    },5000)
  }
  
  useEffect(() => {
    if(localStorage.getItem("documentForm")){
      const savedItems = JSON.parse(localStorage.getItem("documentForm"));
      if(name === savedItems.receiver){
        setMessage(savedItems.message)
      }
    }
  },[])
  
  useEffect(() => {
    localStorage.setItem("documentForm", JSON.stringify({
      receiver: name, 
      message
    }));
  }, [message])
  
  
  
  if(Object.keys(receiverInfo).length === 0){
    return <Loading>
            <p>or check if the receiver's name is correct</p>
    </Loading>
  }
  
  
  

  
  return <div className = "my-8">
          {
        isPopUpOpen && <PopUp message = {popUpMsg} />
      }
    <div className = "text-center">
      <p className = "text-lg italic">Send <span className = "font-bold">{name}</span> a message! </p>
      <p className = "text-sm my-3 text-gray-500 text-center">Sending a message will ensure complete anonymity, so feel free to share your thoughts</p>
    </div>
    <main className = "flex flex-col items-center justify-center gap-4 my-5">
      <textarea onChange = {e => setMessage(e.target.value)} value = {message} ref = {textAreaRef} className = "w-full outline outline-black/20 outline-[1px] rounded-lg p-2 min-h-[50vh]"/>
      <button className = "bg-black/85 text-neutral-50 px-6 py-2 rounded-lg hover:bg-neutral-50 hover:outline hover:text-black/85" onClick = {handleSendNote}>
        Send!
      </button>
    </main>
</div>
}

export default UserSubmit;