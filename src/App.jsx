import { useEffect } from 'react'
import './App.css'
import { Routes, Route, useParams, Outlet, useLocation } from 'react-router-dom';
import NoteProfile from './Components/NoteProfile.jsx';

import NavBar from './Components/Navbar.jsx';
import SearchBar from './Components/SearchBar.jsx';
import SubmitNotePage from './pages/SubmitNote.jsx';
import BrowsePage from './pages/BrowsePage.jsx';
import NoteDetail from './pages/NoteDetail.jsx';
import NotFound from './pages/NotFound.jsx';
function App() {

  const location = useLocation();

useEffect(() => {
    if(location.pathname !== "/"){
      
    }
    
    
  }, [location, location.pathname])

  return (
    <div>

      <Routes >
        <Route element={<div className = "flex flex-col items-center justify-center" >
          <NavBar />
          <div className = "w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12">
            <Outlet />
          </div>
        </div>}>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/submit" element={<SubmitNotePage />} />
          <Route path = "/details/:id" element = {<NoteDetail/>} />
                  <Route path = "*" element = {<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
