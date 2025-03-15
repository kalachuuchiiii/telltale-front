import { CiSearch } from "react-icons/ci";
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAllNotesByReceiver } from '../state/notesSlice.js';
import { useDispatch } from 'react-redux';


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [receiver, setReceiver] = useState("");
  const [placeholderIndex, setPlaceHolderIndex] = useState(0);
  const dispatch = useDispatch();
  
  const getNoteMessages = async(e) => {
    e.preventDefault();
    const receiverName = receiver.trim().toLowerCase();
    if(!receiverName){
      return;
    }
    setSearchQuery({q : receiverName });
    
    dispatch(fetchAllNotesByReceiver(receiverName || ""));
  }
  
  useEffect(() => {
    const query = searchQuery.get("q") 
    if(!query){
      return;
    }
    if(searchQuery.get("q") && searchQuery.get("q") !== ""){
      dispatch(fetchAllNotesByReceiver(searchQuery.get("q")));
    }
  }, [searchQuery])
  
  const placeholders = [
  "Looking for yours?",
  "A secret just for you...",
  "Someone’s thinking of you...",
  "This one has your name on it...",
  "Ever wondered what’s hidden?",
  "Not all messages need a sender...",
  "Some things are meant to be found...",
  "Guess who left this for you...",
  "A message lost in time...",
  "What if this was meant for you?",
  "Do you believe in coincidences?",
  "Curiosity brought you here...",
];

useEffect(() => {
 const intervalId = setInterval(() => {
    setPlaceHolderIndex(prev => prev === (placeholders.length - 1) ? 0 : prev + 1)
  }, 8000);
  
  return() => {
    clearInterval(intervalId);
  }
}, [])

  
  return <form onSubmit = {getNoteMessages} className = "w-11/12 mt-10 mb-6 flex ">
    <input onChange = {(e) => setReceiver(e.target.value)} value = {receiver} className = "p-2 w-full outline rounded-l" placeholder = {placeholders[placeholderIndex]} />
    <button type = "submit" className = "p-2  rounded-r outline hover:scale-110 active:scale-110 duration-200">
      <CiSearch className = "size-6"/>
    </button>
  </form>
}

export default SearchBar;