import { NavLink } from 'react-router-dom';


const NoteProfile = ({note}) => {
  
  return <NavLink to = {`/details/${note?._id}`} className = "p-4 active:scale-105 hover:scale-105  duration-300 w-full flex flex-col gap-1 text-left rounded-lg shadow-lg shadow-gray-100/80 text-sm">
    <p className = "text-sm text-neutral-500">To: {note?.receiver || "..."}</p>
    <p className = "truncate text-base">{note?.message || "..." }</p>
  </NavLink>
}

export default NoteProfile;