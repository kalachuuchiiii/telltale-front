import { NavLink } from 'react-router-dom';


const NoteProfile = ({note}) => {
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const [year, month, date] = note.createdAt.split("T")[0].split("-").map(Number);
  
  
  return <NavLink to = {`/details/${note?._id}`} className = " active:scale-105 hover:scale-105  duration-300 w-full flex flex-col gap-1 text-left rounded-xl shadow-lg shadow-gray-100/80 text-sm outline outline-neutral-300 overflow-hidden">
    <div className = "p-4">
          <p className = "text-base text-neutral-500">To: {note?.receiver || "..."}</p>
    <p className = "truncate text-lg">{note?.message || "..." }</p>
    </div>
    <p className = "p-2 text-sm text-neutral-500 outline outline-neutral-300 w-full bg-neutral-200 ">
      Sent on {`${months[month -1]} ${date}, ${year}`}
    </p>
  </NavLink>
}

export default NoteProfile;