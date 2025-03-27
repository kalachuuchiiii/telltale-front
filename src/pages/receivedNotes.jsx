import { Loading } from '../Components/Loading.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { SpecificNoteProfile } from '../Components/SpecificNoteProfile.jsx';

const ReceivedNotes = ({id}) => {
  
  const [receivedNotes, setReceivedNotes] = useState([])
  const [totalReceived, setTotalReceived] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEndPage, setIsEndPage] = useState(false);
  const [page, setPage] = useState(1);
  
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

const fetchReceivedNotes = async() => {
  try{
    
    setLoading(true);
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-received-notes/${id}/${page}`);
    console.log("received", {res})
    
    if(res.data.success){
      setReceivedNotes(prev => [...prev, ...res.data.allReceivedNotes]);
    setTotalReceived(res.data.totalReceivedNotes)
    setLoading(false);
    }
  }catch(e){
    console.log({e})
  }
}

useEffect(() => {
    if(page !== 1 || (receivedNotes.length > 0))return;
    if(page === 1){
      fetchReceivedNotes();
    }
  }, [id, page]);
  
  useEffect(() => {
    if(page !== 1 && receivedNotes.length === totalReceived && receivedNotes.length !== 0){
      setIsEndPage(true);
      
    }
  }, [page, receivedNotes, totalReceived])
  
  useEffect(() => {
    if(isEndPage || totalReceived === receivedNotes.length && totalReceived !== 0){
      setIsEndPage(true)
      return;
    }
    if(page !== 1){
      fetchReceivedNotes();
    }
  }, [page])

  
  if(!id){
    return <Loading />
  }
  
  return <div className = "w-full">
    <div className="text-center italic rounded-lg mx-4 my-8 bg-pink-50 p-4 outline outline-pink-200 flex flex-col">
      Notes sent here are completely anonymous. Hints are not available at the moment, but feel free to interpret the messages in your own way.
    </div>
    <p className = "text-gray-500 mt-8 text-sm text-center">You received a total of {totalReceived} note/s</p>
    <main className = "my-8 flex flex-col w-full gap-4">
          {
      receivedNotes && receivedNotes.length > 0 && receivedNotes.map(note => <SpecificNoteProfile note = {note} />) 
    }
    </main>
    {
      isEndPage ? <p className = "text-gray-500 pb-4 text-sm text-center">
        You've seen all received notes
      </p> : loading && <div className = "flex justify-center items-center">
        <MoonLoader size = "24" color = "black" />
      </div>
    }
  </div>
}

export default ReceivedNotes;