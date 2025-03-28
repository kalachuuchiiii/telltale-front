import { useEffect, useState, lazy, Suspense } from 'react'
import './App.css'
import { Routes, Route, useParams, Outlet, useLocation } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';

const Register = lazy(() => import('./pages/Register.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const SubmitHistory = lazy(() => import("./pages/SubmittedNoteHistory.jsx"))
const UserSubmit = lazy(() => import("./pages/UserSubmit.jsx"))
const ReceivedNotes = lazy(() => import("./pages/receivedNotes.jsx"));
const SpecificNotePage = lazy(() => import("./pages/SpecificNotePage.jsx"))
import SubmitNotePage from './pages/SubmitNote.jsx'
import NavBar from './Components/Navbar.jsx';
import SearchBar from './Components/SearchBar.jsx';
import BrowsePage from './pages/BrowsePage.jsx';
import NoteDetail from './pages/NoteDetail.jsx';
import NoteProfile from './Components/NoteProfile.jsx';
import { Loading } from './Components/Loading.jsx';
function App() {
 
  const [userInfo, setUserInfo] = useState({})
  const [isSessionLookingPending, setIsSessionLookPending] = useState(true);
  const location = useLocation();
  
  const checkForSession = async() => {
      setIsSessionLookPending(true);
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/session`, {}, {
          withCredentials: true
        })
        
        
        setUserInfo(res?.data?.userInfo || {});
        setIsSessionLookPending(false);
      }catch(e){
        setIsSessionLookPending(false)
      }
    }


  useEffect(() => {
    if(Object.keys(userInfo).length === 0){
      checkForSession();
    }
  }, [userInfo])

  return (
    <div>
      <Routes>
        <Route element={<div className = "flex flex-col items-center justify-center" >
          <NavBar isSessionLookingPending = {isSessionLookingPending} userInfo = {userInfo}/>
          <div className = "w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12">
            <Suspense fallback = {<Loading/>}>
            {
              isSessionLookingPending ? <Loading /> : <Outlet />
            }
            </Suspense>
            </div>
        </div>} >
          <Route path="/" element={<BrowsePage isAuthenticated = {Object.keys(userInfo).length > 0} />} />
          <Route path="/submit" element={<SubmitNotePage userInfo = {userInfo}/>} />
          <Route path = "/details/:id" element = {<NoteDetail/>} />
                  <Route path = "/register" element = {<Register />} />
                  <Route path = "/login" element = {<Login />} />
                  {
                    Object.keys(userInfo).length > 0 && <Route path = "/submit-history" element = {<SubmitHistory sender = {userInfo?._id} isSessionLookingPending = {isSessionLookingPending} />} />
                  }
                  <Route path = "*" element = {<NotFound />} />
                  <Route path = "/u/:name" element = {<UserSubmit />} />
                  <Route path = "/received-notes" element = {<ReceivedNotes id = {userInfo._id}/>} />
                  <Route path = "/s/details/:id" element = {<SpecificNotePage />} />
</Route>
      </Routes>
      
    
    </div>

  )
}

export default App;
