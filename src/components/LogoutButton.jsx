import React from 'react'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/authService';
import { LogoutContext } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({setDataOpen}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const logoutHandler = () =>{
        authService.logout().then(()=>{
            dispatch(LogoutContext());
            setDataOpen(false)
            navigate("/login")
        })
    }

    return (
        <button
            className='inline-bock px-6 py-2 duration-200 text-white w-full rounded-full'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutButton