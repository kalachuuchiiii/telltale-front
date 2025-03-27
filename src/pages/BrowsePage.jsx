import NoteProfile from '../Components/NoteProfile.jsx';
import NavBar from '../Components/Navbar.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useSearchParams, NavLink } from 'react-router-dom';
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
  const [isSearching, setIsSearching] = useState(false);
  
  
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
    setIsSearching((searchQuery.get("q") && searchQuery.get("q") !== "") || (searchResults.length > 0 && page !== 1));
  }, [searchResults, notes, searchQuery, searchQuery.get("q")])



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
    <div className = "mt-4 p-4 outline rounded-lg outline-pink-200 w-11/12 italic text-center bg-pink-50">
<NavLink to = "/login" className = "underline" >Login</NavLink> or <NavLink to = "/register" className = "underline">Create an account</NavLink> to share your unique link, receive anonymous notes directly, and reply in a private space!
    </div>
    <div className = "mt-4 p-4 w-11/12 outline rounded-lg outline-pink-200 italic text-center bg-pink-50">
      Send your thoughts, confessions, or the words you’ve never said—a place to let it out.
    </div>
    <SearchBar />
    <div className="flex flex-col items-center gap-4 justify-center w-10/12 text-sm">
      {
        (isSearching ? <p className="text-gray-500 mb-4">Notes found for '{searchQuery.get("q")}' : {isSearching ? searchResultTotalCount : totalNotesCount}</p> : <p className="text-gray-500 mb-4"> {totalNotesCount} Notes Found</p>)
      }
      {
        (notes && notes.length > 0 && !isSearching) ? notes.map(note => <NoteProfile key = {note._id} note = {note} />) : isSearching  && searchResults.map(note => <NoteProfile key = {note?._id}note = {note} />)
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