import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import PopUp from '../Components/popUp.jsx';
import { AnimatePresence } from 'framer-motion';

const SubmitPage = ({userInfo}) => {

  const [documentFormat, setDocumentFormat] = useState({
    receiver: JSON.parse(localStorage.getItem("documentFormat"))?.receiver || "",
    message: JSON.parse(localStorage.getItem("documentFormat"))?.message || ""
  });
  const [clientMessage, setClientMessage] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const textAreaRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("documentFormat", JSON.stringify(documentFormat));
  }, [documentFormat]);

  const handleDocChange = (e) => {
    const { name, value } = e.target;

    setDocumentFormat(prev => {
      return {
        ...prev, [name]: value
      }
    })

  }

  useEffect(() => {

    if (textAreaRef && textAreaRef.current) {
      const textRef = textAreaRef.current;
      textRef.style.height = "auto"
      textRef.style.height = `${textRef.scrollHeight}px`;
    }
  }, [documentFormat])


  const addNote = async (e) => {
    e.preventDefault();
    const { receiver, message } = documentFormat;
    if (!receiver || !message) {
      setClientMessage("Invalid receiver or message");
      setIsPopUpOpen(true);

    } else {

      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add-note`, { receiver, message, sender: userInfo?._id || "" });
        
        if (res.data.success) {
          setClientMessage(res.data.message);
          setIsPopUpOpen(true);
        }
        setDocumentFormat({
          receiver: "",
          message: ""
        })
      } catch (e) {
        setClientMessage(e?.response?.data?.message || "Internal Server Error");
        setIsPopUpOpen(true);
      }
    }
    setTimeout(() => {
      setIsPopUpOpen(false);
      setClientMessage("");

    }, 3000)
  }


  return <div className="w-full mb-10">
    <AnimatePresence>
      {
        isPopUpOpen && <PopUp message={clientMessage} />
      }
    </AnimatePresence>
    <p className="text-center italic rounded-lg mx-4 my-8 bg-pink-50 p-4 outline outline-pink-200 flex flex-col">
      This project allows you to send messages anonymously,
      <span>
        So feel free to send one!
      </span>
    </p>
    <form onSubmit={addNote} className="w-full flex flex-col items-center gap-1">
      <section className = "flex w-full items-center ">
        <label className = "p-2">To:</label>
              <input value={documentFormat.receiver} name="receiver" onChange={handleDocChange} placeholder = "Who?" className="p-2 w-full rounded outline"/>
      </section>
      {

      }
      <textarea value={documentFormat.message} name="message" onChange={handleDocChange} ref={textAreaRef} className="px-4 py-8 rounded-lg shadow-lg shadow-gray-100/80 min-h-[40vh] w-full outline-none my-8" placeholder="Write your message here..." />
      <button type="submit" className="w-6/12 p-2 rounded outline bg-neutral-50 text-gray-800 active:bg-gray-800 hover:bg-gray-800 active:text-neutral-50 hover:text-neutral-50 duration-200 cursor-pointer">Send!</button>
    </form>
  </div>
}

export default SubmitPage;