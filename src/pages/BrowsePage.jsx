import NoteProfile from '../Components/NoteProfile.jsx';
import NavBar from '../Components/Navbar.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchAllNotes } from '../state/notesSlice.js';
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';

const BrowsePage = () => {
  
  const dispatch = useDispatch();
  const { notes, loading, error } = useSelector(state => state.note);
  const [searchQuery] = useSearchParams();
  
  
  
  useEffect(() => {
    
    if(searchQuery.get("q") === "" || !searchQuery.get("q")){
      dispatch(fetchAllNotes());
    }
  }, [dispatch, searchQuery]);
  
  
  return <div className="w-full flex flex-col justify-center items-center">
        <SearchBar />
        <div className="flex flex-col items-center gap-2 justify-center w-full text-sm">
          {
            !loading && (searchQuery.get("q") ? <p className = "text-gray-500 mb-4">Messages found for "{searchQuery.get("q")}": {notes.length}</p> : <p className = "text-gray-500 mb-4">{notes.length} Notes Found</p>)
          }
          {
            error ? <p> Something unexpected has occured. Please try again later.</p> : loading ? <p className = "text-gray-500">Loading...</p> : (notes && notes.length > 0) && notes.slice().reverse().map(note => {
              return <NoteProfile note = {note} />
            })  
          }
        </div>
      </div>
    
}

export default BrowsePage;