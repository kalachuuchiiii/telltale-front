import { MoonLoader } from 'react-spinners';

export const Loading = ({children}) => {
  
      return <div className = "fixed inset-0 flex justify-center items-center flex-col gap-4">

      <MoonLoader size = "24" color = "black"/>
      <p className = "text-sm text-gray-500 text-center">
              <p className = "text-base">Loading...</p>
                <p>
        If this takes too long, please reload the page,
      </p>
{children}
      </p>
    </div>
}