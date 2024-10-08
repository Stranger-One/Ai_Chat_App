import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/authService';
import { LogoutContext } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { FiLoader } from "react-icons/fi";
import toast from 'react-hot-toast';
import { setHistoryList } from '../store/dataSlice';


const LogoutButton = ({setDataOpen}) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const logoutHandler = () =>{
        setLoading(true)
        authService.logout().then(()=>{
            dispatch(LogoutContext());
            setDataOpen(false)
            toast.success("Logout Successfully")
            // dispatch(setHistoryList())
            setLoading(false)
            navigate("/login")
        })
    }

    return (
        <button
            className='inline-bock px-6 py-2 duration-200 text-white w-full rounded-full'
            onClick={logoutHandler}
        >{loading ? (
            <FiLoader className="animate-spin text-white text-2xl mx-auto" />
        ) : "Logout"}</button>
    )
}

export default LogoutButton