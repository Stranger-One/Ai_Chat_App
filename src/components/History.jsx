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



const History = () => {
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
            setLoading(true)
            setHistoryLists([])
            storageService.listDocument(userData.email).then((resp) => {
                // console.log(resp.documents);
                setHistoryLists(resp.documents)
                // dispatch(setHistoryList(...resp.documents))
            })
            setLoading(false)
        }

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
        <section className={`p-2 border-r-[1px] absolute  top-0 ${menuOpen ? 'left-[0] lg:w-[250px]' : '-left-[100%] lg:w-[0px]'} w-[80%]  h-full bg-zinc-900 z-10 duration-200 lg:relative`}>
            <div className="w-full h-12 bg-zinc-800 rounded-md flex justify-between items-center px-2 relative">
                <div className=" h-10 rounded-full overflow-hidden ">
                    <img src="/ai-logo.jpg" alt="" className='h-full' />
                </div>
                <div className='relative group'>
                    <FiEdit onClick={() => handleNavigate("/")} className='text-white text-xl cursor-pointer' />
                    <div className='absolute -top-1 left-[170%] px-8 py-1 text-white bg-zinc-800 border-[1px] whitespace-nowrap rounded-sm group-hover:visible invisible duration-200'>
                        <RiArrowLeftSFill className='absolute -left-5 top-1/2 -translate-y-1/2 text-3xl' />
                        New Chat
                    </div>
                </div>
            </div>
            <hr className='my-2' />
            <div className="History-List w-full flex flex-col gap-2">
                {loading ? (
                    <FiLoader className="animate-spin text-white text-2xl mx-auto" />
                ) : historyLists.length != 0 ? historyLists.map((doc) => (
                    <li onClick={() => handleNavigate(`/${doc.$id}`)} key={doc.$id} className='list-none px-2 py-2 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>
                        {doc.title}
                    </li>
                )) : <h2 className='text-xl text-white mx-auto'>No history</h2>}

            </div>
        </section>
    )
}

export default History