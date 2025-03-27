import { NavLink } from 'react-router-dom';

export const SpecificNoteProfile = ({note}) => {
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const [year, month, date] = note.createdAt.split("T")[0].split("-").map(Number);
  
  
  const { message, _id } = note;
  return <NavLink to = {`/s/details/${_id}`} className = " active:scale-105 hover:scale-105  duration-300 w-full flex flex-col gap-1 text-left rounded-xl shadow-lg shadow-gray-100/80 text-sm outline outline-neutral-300 overflow-hidden">
    <div className = "p-4">

    <p className = "truncate text-lg">{message || "..." }</p>
    </div>
    <p className = "p-2 text-sm text-neutral-500 w-full bg-pink-50 ">
      Sent on {`${months[month -1]} ${date}, ${year}`}
    </p>
  </NavLink>
  
}