import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import storageService from '../appwrite/storageService';
import { Link, useNavigate } from 'react-router-dom';
import { closeMenu } from '../store/menuSlice';
import { setHistoryList } from '../store/dataSlice';
import { FiLoader } from "react-icons/fi";
import { RiArrowDownSFill } from "react-icons/ri";
import { RiArrowLeftSFill } from "react-icons/ri";
import { SiGooglegemini } from "react-icons/si";



const History = ({setPageLoading}) => {
    const menuOpen = useSelector((state) => state.menu.open)
    const [historyLists, setHistoryLists] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const historyList = useSelector(state => state.data.historyList)
    const userData = useSelector(state => state.auth.userData)
    const userStatus = useSelector(state => state.auth.userStatus)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        // const historyManage = () => {

        // };
        if (userStatus) {
            // setLoading(true)
            setPageLoading(true)
            setHistoryLists([])
            storageService.listDocument(userData.email).then((resp) => {
                // console.log(resp.documents);
                setHistoryLists(resp.documents)
                // dispatch(setHistoryList(...resp.documents))
            })
            // setLoading(false)
            
        }
        
        setPageLoading(false)
    }, [historyList, userStatus, dispatch])

    const handleNavigate = (id) => {
        let screen = window.innerWidth;
        if (screen < 1000) {
            dispatch(closeMenu())
        }
        navigate(id)
    };

    // console.log(historyLists); 
    return (
        <section className={`absolute  top-0 ${menuOpen ? 'left-[0] lg:w-[250px] p-2' : '-left-[100%] lg:w-[0px] p-0'} w-[80%]  h-full bg-zinc-900 z-10 duration-200 lg:relative `}>
            <div className="w-full h-10 bg-zinc-800 rounded-md flex justify-between items-center pr-2 relative group cursor-pointer">
                <div className="w-full h-10 rounded-full overflow-hidden flex gap-2 items-center pl-2">
                    <div className="rounded-full border-[1px] h-7 w-7 flex items-center justify-center">
                        <SiGooglegemini className='text-white' />
                    </div>
                    <h2 className='text-white/80 text-[16px] '>Ai Chat App</h2>
                </div>

                <FiEdit onClick={() => handleNavigate("/")} className='text-white text-xl cursor-pointer' />
                <div className='absolute  left-[100%] px-8 py-1 text-zinc-900 bg-zinc-100 whitespace-nowrap rounded-sm group-hover:visible invisible duration-200'>
                    <RiArrowLeftSFill className='absolute -left-[16px] top-1/2 -translate-y-1/2 text-3xl text-zinc-100' />
                    New Chat
                </div>

            </div>
            <hr className='my-2' />
            <div className="History-List w-full flex flex-col gap-2 relative overflow-auto h-[79vh] pr-2 pb-2">
                {loading ? (
                    <FiLoader className="animate-spin text-white text-2xl mx-auto"/>
                ) :
                    historyLists.length != 0 ? historyLists.map((doc) => (
                        <li onClick={() => handleNavigate(`/${doc.$id}`)} key={doc.$id} className='list-none h-[40px] w-full px-2 py-2 flex-shrink-0 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>
                            {doc.title}
                        </li>
                    )) :
                        <h2 className='text-xl text-white mx-auto'>No history</h2>
                }
            </div>
        </section>
    )
}

export default History