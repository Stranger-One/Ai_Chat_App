import React, { useState } from 'react'
import { IoMdMenu } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { openMenu, closeMenu } from '../store/menuSlice.js';
import LogoutButton from './LogoutButton.jsx';
import Button from './Button.jsx';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const menuOpen = useSelector((state) => state.menu.open)
    const userStatus = useSelector((state) => state.auth.userStatus)
    const userData = useSelector((state) => state.auth.userData)
    console.log(userStatus);
    // console.log(userData);
    const [dataOpen, setDataOpen] = useState(false)
    

    const handleMenu = () => {
        if (menuOpen) {
            dispatch(closeMenu())
        } else {
            dispatch(openMenu())
        }
    };

    return (
        <header className='w-full bg-transparent border-b-[1px] z-10 relative flex'>
            <nav className='w-full h-full px-5 flex items-center justify-between '>
                <IoMdMenu onClick={handleMenu} className='text-white text-3xl cursor-pointer' />
                <div className='border border-white/70 px-10 py-1 rounded-lg'>
                    <h2 className='text-white/80 text-lg'>Ai_Chat_App</h2>
                </div>
                {userStatus ?
                    <div className="w-12 rounded-full relative">
                        <img onClick={() => setDataOpen(toggle => !toggle)} src="/User-Profile.png" alt="" className='h-full w-full cursor-pointer' />
                        <div className={` ${dataOpen ? "" : "hidden"} absolute top-[64px] right-0 bg-zinc-800 min-w-[200px] w-fit h-[250px] flex flex-col justify-between p-6 rounded-lg`}>
                            <div className='text-white w-full text-center'>
                                <h2 className='text-lg'>{userData?.name}</h2>
                                <h2 className='text-white/80'>{userData?.email}</h2>
                            </div>
                            <div className='bg-zinc-900 rounded-lg'>
                                <LogoutButton setDataOpen={setDataOpen}  />
                            </div>
                        </div>
                    </div> :
                    <Button onClick={()=> navigate("/login")}>Login</Button>
                }

            </nav>
        </header>
    )
}

export default Header