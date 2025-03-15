import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return <div className = "fixed inset-0 flex justify-center items-center flex-col gap-2 bg-black/90">
    <p className = "text-lg italic text-neutral-50">404 | Page not found</p>
    <p className = "text-neutral-500 text-sm text-center">
      The page you're trying to access doesn't exist or has been moved. Check the URL and try again, or head back to the homepage.
    </p>
    <p></p>
  </div>
}

export default NotFound;