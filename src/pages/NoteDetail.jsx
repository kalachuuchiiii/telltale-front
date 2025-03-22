import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NoteDetail = () => {
  
  const [note, setNote] = useState({});
  const [date, setDate] = useState("");
  
  
    
  
  
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
      }
          <p className = "text-gray-400 mt-8 mx-4 mb-0 text-right text-sm">Sent on {
     date || "..."
    }</p>
    </div>
  </div>
}

export default NoteDetail;