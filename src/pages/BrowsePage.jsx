import NoteProfile from '../Components/NoteProfile.jsx';
import NavBar from '../Components/Navbar.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

const BrowsePage = () => {

  const [searchQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [notes, setNotes] = useState([]);
  const [totalNotesCount, setTotalNotesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const topRef = useRef(null);
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultTotalCount, setSearchResultTotalCount] = useState(0);
  const [stopPagination, setStopPagination] = useState(false)
  
  
  const handleFetchData = async(pageNum) => {
    if(searchResults.length > 0 || searchResultTotalCount > 0){
      setSearchResults([]);
      setSearchResultTotalCount(0);
    }
    setLoading(true);
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-note/${pageNum}`)
      setNotes(prev => [...prev, ...res.data.notes])
      setTotalNotesCount(res.data.allNotesCount);
    setLoading(false);
      
    }catch(e){
      
    }
  }
  
  
  const handleFetchDataByReceiver = async(receiver, pageNum) => {
    
    setLoading(true);
    if(notes.length > 0 && totalNotesCount > 0){
      setNotes([]);
      setTotalNotesCount(0);
    }
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-notesof/${receiver}/${pageNum}`)
      
      setSearchResults(prev => [...prev, ...res.data.notes])
      setSearchResultTotalCount(res.data.allNotesCount);
    setLoading(false);
      
    }catch(e){
    
    }
  }
  

  

  
  
  
  useEffect(() => {
    //Initial Render Fetching
    setStopPagination(false);
    if((notes.length === 0  && (!searchQuery.get("q") || searchQuery.get("q") === ""))){
      setPage(1);
      setStopPagination(false);
      handleFetchData(1);
      return;
    }
    if(searchQuery.get("q")){
      setStopPagination(false);
      setSearchResults([]);
      setPage(1);
      setSearchResultTotalCount(0);
        handleFetchDataByReceiver(searchQuery.get("q"), 1);
      
    }
  }, [searchQuery, searchQuery.get("q")]);
  
  
  useEffect(() => {
    
    //Infinite Scroll Fetching
    if(searchQuery.get("q") && page !== 1 && !stopPagination){
      setLoading(true);
      handleFetchDataByReceiver(searchQuery.get("q"), page);
      return;
    }
    
    if(!stopPagination && (page !== 1 && (!searchQuery.get("q") || searchQuery.get("q") === ""))){
   setLoading(true);
      handleFetchData(page);
    }
  }, [page])
  
  useEffect(() => {
    
      setStopPagination((searchResults.length !== 0 && searchResults.length === searchResultTotalCount) || (notes.length !== 0 && notes.length === totalNotesCount));
      
    
  }, [notes, searchResults])



  useEffect(() => {
    const handleScrollFetch = () => {
      
      if ((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight - 10) {
        setPage(prev => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScrollFetch);

    return () => {
      window.removeEventListener("scroll", handleScrollFetch);
      
    
    }

  }, [])




  return <div ref={topRef} className="w-full flex flex-col justify-center items-center" >
    <SearchBar />
    <div className="flex flex-col items-center gap-4 justify-center w-full text-sm">
      {
        (searchQuery.get("q") ? <p className="text-gray-500 mb-4">Notes found for  '{searchQuery.get("q")}' : {totalNotesCount || searchResultTotalCount}</p> : <p className="text-gray-500 mb-4"> {totalNotesCount || searchResultTotalCount} Notes Found</p>)
      }

      {
        notes && notes.length > 0 && !searchQuery.get("q") ? notes.map(note => <NoteProfile key = {note._id} note = {note} />) : searchResults && searchResults.length > 0 && searchQuery.get("q") && searchResults.map(note => <NoteProfile key = {note?._id}note = {note} />)
      }

      <div className="pb-4 flex justify-center items-center">
        {

        loading ? <MoonLoader size="26" />: stopPagination && <p className = "text-neutral-500" >You've seen all notes
          </p>
        }
      </div>
    </div>
  </div>

}

export default BrowsePage;