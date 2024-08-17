import React, { useEffect, useRef, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import Request from './Request.jsx';
import Response from './Response.jsx';
import { FiLoader } from "react-icons/fi";
import getResponse from '../gemini/getResponse.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import storageService from '../appwrite/storageService.js';
import { useLocation } from 'react-router-dom';
import { setHistoryList } from '../store/dataSlice.js';


const Chat = () => {
    const inputRef = useRef()
    const chatBox = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userStatus = useSelector(state => state.auth.userStatus)
    const userData = useSelector(state => state.auth.userData)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const { documentId } = useParams()
    const location = useLocation();


    const getChats = async (docId) => {
        setLoading(true)
        let getDocument = await storageService.getDocument(docId)

        let fetchedChats = JSON.parse(getDocument.chats)
        // console.log(fetchedChats);
        setMessages(fetchedChats)

        for (let i = 0; i < fetchedChats.length; i++) {
            if (i % 2 === 0) {
                setChats((curChats) => [...curChats, <Request req={fetchedChats[i]} />])
            } else {
                setChats((curChats) => [...curChats, <Response resp={fetchedChats[i]} />])
            }
        }
        setLoading(false)
    };

    const createDocument = async (request, response) => {
        let stringifiedMessage = JSON.stringify([request, response])

        const createdDoc = await storageService.createDocument(userData.email, stringifiedMessage)
        if (createdDoc) {
            console.log("document created", createdDoc);
            dispatch(setHistoryList(createdDoc.$id))
            navigate(createdDoc.$id)
        }
    };

    const updateDocument = async (request, response) => {
        let stringifiedMessage = JSON.stringify([...messages, request, ...(response ? [response] : [])])
        // console.log(userData);
        await storageService.updateDocument(userData.email, stringifiedMessage, documentId).then((resp) => {
            console.log("document updated", resp);
        })
    };

    // console.log(navigateTo);
    useEffect(() => {
        console.log(location.pathname.slice(1));
        let id = location.pathname.slice(1)
        setMessages([])
        setChats([])

        if (id) {
            console.log("existing chat");
            getChats(id)
        } else {
            console.log("new chat");
        }
    }, [location])

    const handleRequest = async (e) => {
        e.preventDefault()
        setLoading(true)
        const request = inputRef.current.value

        if (chats.length == 0) {
            // create Document
            setMessages(message => [...message, request])
            setChats((curChats) => [...curChats, <Request req={request} />])
            inputRef.current.value = ''

            const response = await getResponse(request)
            // console.log(response);
            if (response) {
                setMessages(message => [...message, response])
                setChats((curChats) => [...curChats, <Response resp={response} />])

                createDocument(request, response)
            }
        }
        else {
            // update document
            setMessages(message => [...message, request])
            setChats((curChats) => [...curChats, <Request req={request} />])
            inputRef.current.value = ''

            const response = await getResponse(request)
            // console.log(response);
            if (response) {
                setMessages(message => [...message, response])
                setChats((curChats) => [...curChats, <Response resp={response} />])

                updateDocument(request, response)
            }
        }
        setLoading(false)
    };

    useEffect(() => {
        if (chatBox.current) {
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
        }
    }, [chats])

    return (
        <section className='w-full h-full relative'>
            <div className="relative w-full h-full pb-2 ">
                {chats.length > 0 ?
                    <div ref={chatBox} className='w-full h-[80vh] flex flex-col custom-scrollbar overflow-auto relative px-4 pt-4'>
                        {chats.map((chat, index) => (
                            <React.Fragment key={index}>{chat}</React.Fragment>
                        ))}
                    </div> :
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <h1 className='text-white/80 text-3xl'>I am ready to answer you...</h1>
                        <h1 className='text-white/50 text-xl'>Ask whatever you want </h1>
                        {!userStatus && <Link to="/login" className='text-blue-600 text-xl' >Login to chat</Link>}
                    </div>
                }

            </div>
            <form onSubmit={(e) => handleRequest(e)} className="w-[80%] grid grid-cols-[auto_40px] rounded-lg overflow-hidden border p-2 absolute bottom-3 left-1/2 -translate-x-1/2 ">
                <input disabled={!userStatus} ref={inputRef} type="text" placeholder='Ask me anything ...' className=' outline-none border-none bg-transparent text-white/80 ' />
                <button type='submit' disabled={loading || !userStatus} className=' rounded-lg text-lg flex items-center justify-center '>
                    {loading ? (
                        <FiLoader className="animate-spin text-white text-2xl" />
                    ) : (
                        <><IoIosSend className="ml-2 text-white text-2xl" /></>
                    )}
                </button>
            </form>
        </section>
    )
}

export default Chat