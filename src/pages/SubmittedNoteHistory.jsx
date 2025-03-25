import { useState, useEffect } from 'react';
import NotFound from '../pages/NotFound.jsx';
import NoteProfile from '../Components/NoteProfile.jsx';
import { MoonLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const SubmitHistory = ({sender}) => {
  
  const [submittedNotes, setSubmittedNotes] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isNotesEmpty, setIsNotesEmpty] = useState(false);
  const [totalNotes, setTotalNotes] = useState(0);
  
  useEffect(() => {
    const findAllSubmittedNotesByUser = async() => {
      try {
        setIsPending(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-submitted-notes-by-user/${sender}`);
        console.log({res})
        const { totalNotesSubmitted, notesSubmittedBySender } = res.data;
        if(totalNotesSubmitted === 0 ){
          setIsNotesEmpty(true);
          return;
        }
        setSubmittedNotes(notesSubmittedBySender);
        setTotalNotes(totalNotesSubmitted);
        setIsPending(false);
      }catch(e){
        console.log({e})
        setIsPending(false);
      }
    }
    findAllSubmittedNotesByUser();
  }, [sender])
  
  if(isPending){
    return <div className = "flex fixed inset-0 justify-center items-center">
       <MoonLoader size = "20"/>
    </div>
  }
  
  return <div className = "flex flex-col my-6">
    {
      isNotesEmpty ? <p>You've submitted 0 notes. <NavLink>Submit</NavLink></p> : 
      <div className = "flex flex-col gap-4">
         <p className = "text-center text-sm text-gray-500">{totalNotes} Notes Found</p>
        {
        (submittedNotes && submittedNotes.length > 0) && submittedNotes.map(note => <NoteProfile key = {note._id} note = {note} />
          )
        }
        </div>
      
    }
  </div>
  
}

export default SubmitHistory;