import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import storageService from '../appwrite/storageService';
import { Link, useNavigate } from 'react-router-dom';
import { closeMenu } from '../store/menuSlice';


const History = () => {
    const menuOpen = useSelector((state) => state.menu.open)
    const [historyList, setHistoryList] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const historyManage = async () => {
            await storageService.listDocument().then((resp) => {
                // console.log(resp.documents);
                setHistoryList(resp.documents)
            })
        };
        historyManage()

    }, [])

    const handleNavigate = (id) => {
        dispatch(closeMenu())
        navigate(id)
    };


    return (
        <section className={`p-2 border-r-[1px] absolute  top-0 ${menuOpen ? 'left-[0] lg:w-[250px]' : '-left-[100%] lg:w-[0px]'} w-[80%]  h-full bg-zinc-900 z-10 duration-200 lg:relative`}>
            <div className="w-full h-12 bg-zinc-800 rounded-md flex justify-between items-center px-2">
                <div className=" h-10 rounded-full overflow-hidden ">
                    <img src="/ai-logo.jpg" alt="" className='h-full' />
                </div>
                
                    <FiEdit  onClick={() => handleNavigate("/")} className='text-white text-xl cursor-pointer' />
                

            </div>
            <hr className='my-2' />
            <div className="History-List w-full flex flex-col gap-2">
                {historyList.length > 0 ? historyList.map((doc) => (
                    <li onClick={() => handleNavigate(`/${doc.$id}`)} key={doc.$id} className='list-none px-2 py-2 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>{
                        JSON.parse(doc.chats)[0]
                    } </li>

                )) : <h2 className='text-xl text-white mx-auto'>No history</h2> }
            </div>
        </section>
    )
}

export default History