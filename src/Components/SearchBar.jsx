import { CiSearch } from "react-icons/ci";
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();
  const [receiver, setReceiver] = useState(searchQuery.get("q") || "");
  const [placeholderIndex, setPlaceHolderIndex] = useState(0);
  

  const handleFetchByReceiver = async(e) => {
    e.preventDefault();
    setSearchQuery({q: receiver});
  }

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
    return () => {
      clearInterval(intervalId);
    }
  }, []);


  return <form onSubmit={handleFetchByReceiver} className="w-11/12 mt-10 outline rounded-lg mb-6 flex ">
    <input onChange={(e) => setReceiver(e.target.value)} value={receiver} className="p-2 w-full  rounded-l" placeholder={placeholders[placeholderIndex]} />
    <button type="submit" className="p-2  rounded-r  bg-gray-900 hover:bg-black text-white hover:text-gray-600 duration-200">
      <CiSearch className="size-6" />
    </button>
  </form>
}

export default SearchBar;