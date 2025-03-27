import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IoCopyOutline } from "react-icons/io5";

const NoteDetail = () => {
  
  const [note, setNote] = useState({});
  const [date, setDate] = useState("");
  const [copied, setCopied] = useState(false);
  
    
  
  
  const { id } = useParams();
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  useEffect(() => {
    const fetchDetail = async() => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-one-note/${id}`);
      if(res.data.success){
        setNote(res.data.note);
        
        
    const [year, month, day] = res.data.note.createdAt.split("T")[0].split("-").map(Number);
    setDate(`${months[month - 1]} ${day}, ${year}`);
      }
    }
    fetchDetail();
    
  }, [id])
  
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true); 
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }
  
  
  if(Object.keys(note).length === 0){
    return <div className = "my-4 text-sm text-center text-gray-500">
      Loading...
    </div>
  }
  
  return <div className = "w-full flex flex-col items-center">
    <section className = "my-8 text-center">
       <p>Hello, {note.receiver || "..."}!</p>
    <p className = "text-gray-500 text-xs" >
      An anonymous person has sent you a note!
    </p>
    </section>
    <div className = "mb-8 px-4 pb-8 w-full shadow-lg rounded-lg text-lg shadow-gray-100/80 text-center">
      {
        note.message || "..."
      }      <div className = "w-full flex justify-between items-center mt-10 text-sm  ">
        <button className = "text-center truncate w-20" onClick = {handleCopy}>{
          copied ? <p className = "text-gray-600">Copied!</p> : <div className = "flex justify-center gap-2 "><IoCopyOutline  /> Share link</div>
        }</button>
                  <p className = "text-gray-400 text-right ">Sent on {
     date || "..."
    }</p>
      </div>
      
    </div>
  </div>
}

export default NoteDetail;