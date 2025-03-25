import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useParams, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import NoteProfile from './Components/NoteProfile.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import NavBar from './Components/Navbar.jsx';
import SearchBar from './Components/SearchBar.jsx';
import SubmitNotePage from './pages/SubmitNote.jsx';
import BrowsePage from './pages/BrowsePage.jsx';
import NoteDetail from './pages/NoteDetail.jsx';
import NotFound from './pages/NotFound.jsx';
function App() {
 
  const [userInfo, setUserInfo] = useState({})
  const [isSessionLookingPending, setIsSessionLookPending] = useState(true);
  const location = useLocation();

useEffect(() => {
    if(location.pathname !== "/"){
      
    }
    
    
  }, [location, location.pathname])
  
  useEffect(() => {
  
    const checkForSession = async() => {
      setIsSessionLookPending(true);
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/session`, {}, {
          withCredentials: true
        })
        console.log({res})
        if(Object.keys(res.data.userInfo).length === 0)return;
        setUserInfo(res.data.userInfo);
        setIsSessionLookPending(false);
      }catch(e){
        console.log({e})
        setIsSessionLookPending(false)
      }
    }
    checkForSession();
  }, [])

  return (
    <div>

      <Routes >
        <Route element={<div className = "flex flex-col items-center justify-center" >
          <NavBar isSessionLookingPending = {isSessionLookingPending} userInfo = {userInfo}/>
          <div className = "w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12">
            <Outlet />
          </div>
        </div>}>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/submit" element={<SubmitNotePage userInfo = {userInfo}/>} />
          <Route path = "/details/:id" element = {<NoteDetail/>} />
                  <Route path = "/register" element = {<Register />} />
                  <Route path = "/login" element = {<Login />} />
                  <Route path = "*" element = {<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
