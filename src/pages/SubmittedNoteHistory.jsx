import { useState, useEffect } from 'react';
import NotFound from '../pages/NotFound.jsx';
import NoteProfile from '../Components/NoteProfile.jsx';
import { Loading } from '../Components/Loading.jsx';
import { MoonLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const SubmitHistory = ({sender, isAuthenticated}) => {
  
  const [submittedNotes, setSubmittedNotes] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isNotesEmpty, setIsNotesEmpty] = useState(false);
  const [totalNotes, setTotalNotes] = useState(0);
  const [page, setPage] = useState(1);
  
  
  const findAllSubmittedNotesByUser = async() => {
      try {
        setIsPending(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-submitted-notes-by-user/${sender}/${page}`);
        console.log({res})
        const { totalNotesSubmitted, notesSubmittedBySender } = res.data;
        if(totalNotesSubmitted === 0 ){
          setIsNotesEmpty(true);
          return;
        }
        setSubmittedNotes(prev => [...prev, ...notesSubmittedBySender]);
        setTotalNotes(totalNotesSubmitted);
        setIsPending(false);
      }catch(e){
        console.log({e})
        setIsPending(false);
      }
    }
  
  
  useEffect(() => {
    if(page !== 1 || (submittedNotes.length > 0))return;
    if(page === 1){
      findAllSubmittedNotesByUser();
    }
  }, [sender, page]);
  
  useEffect(() => {
    if(totalNotes === submittedNotes.length && !isNotesEmpty)return;
    if(page !== 1){
      findAllSubmittedNotesByUser();
    }
  }, [page])
  
  useEffect(() => {
    const handleScrollPagination = () => {
      
      if ((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight - 10) {
        setPage(prev => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScrollPagination);

    return () => {
      window.removeEventListener("scroll", handleScrollPagination);
    }
  }, [])
  
  if(!isAuthenticated){
    
    return <Loading>
     Note: Make sure you're logged in to access this page.
    </Loading>
  }
  
  
  
  return <div className = "flex flex-col my-6">
    {
      isNotesEmpty ? <p>You've submitted 0 notes. <NavLink>Submit</NavLink></p> : 
      <div className = "flex flex-col gap-4">
         <p className = "text-center text-sm text-gray-500">{totalNotes} Submitted note/s found</p>
        {
        (submittedNotes && submittedNotes.length > 0) && submittedNotes.map(note => <NoteProfile key = {note._id} note = {note} />
          )
        }
        {
                  (totalNotes === submittedNotes.length) && (submittedNotes.length !== 0 && totalNotes.length !== 0) ? <p className = "text-center text-gray-500 text-sm">
                    You've seen all notes
                  </p> : isPending && <div className = "w-full flex justify-center ">
                    <MoonLoader color = "black" size = "24"/>
                  </div>
        }
        </div>
      
    }
  </div>
  
}

export default SubmitHistory;