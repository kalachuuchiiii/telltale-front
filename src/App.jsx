import { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route, useParams, Outlet, useLocation } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';

const Register = lazy(() => import('./pages/Register.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const SubmitNotePage = lazy(() => import('./pages/SubmitNote.jsx'));
const SubmitHistory = lazy(() => import("./pages/SubmittedNoteHistory.jsx"))

import NavBar from './Components/Navbar.jsx';
import SearchBar from './Components/SearchBar.jsx';
import BrowsePage from './pages/BrowsePage.jsx';
import NoteDetail from './pages/NoteDetail.jsx';
import NoteProfile from './Components/NoteProfile.jsx';

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
            <Suspense fallback = {<div className = "fixed inset-0 flex items-center justify-center">
              <MoonLoader size = "20"/>
            </div>}>
            {
              isSessionLookingPending ? <div className = "fixed inset-0 flex items-center justify-center">
              <MoonLoader size = "20"/>
            </div> : <Outlet />
            }
            </Suspense>
          </div>
        </div>}>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/submit" element={<SubmitNotePage userInfo = {userInfo}/>} />
          <Route path = "/details/:id" element = {<NoteDetail/>} />
                  <Route path = "/register" element = {<Register />} />
                  <Route path = "/login" element = {<Login />} />
                  {
                    Object.keys(userInfo).length > 0 && <Route path = "/submit-history" element = {<SubmitHistory sender = {userInfo?._id} isSessionLookingPending = {isSessionLookingPending} />} />
                  }
                  <Route path = "*" element = {<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
