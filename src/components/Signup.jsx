import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginContext } from '../store/authSlice'
import authService from '../appwrite/authService'
import { FiLoader } from "react-icons/fi";



const Signup = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
        // console.log(data);
        // setError("")
        setLoading(true)

        try {
            const user = await authService.createAccount(data)
            // console.log("user", user);
            if (user) {
                const userData = await authService.getCurUser()
                // console.log("user data", userData);
                if (userData) dispatch(loginContext(userData));
                navigate("/")
            }
            setLoading(false)
        } catch (error) {
            // setError(error.message)
            setLoading(false)
        }
    }


    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleSubmit(create)} className='w-[300px] h-[450px] flex flex-col items-center justify-between text-white'>
                <div className='w-16 h-16 rounded-full'>
                    <img src="/User-Profile.png" alt="" />
                </div>
                <div className="">
                    <h3 className='text-white'>Already have an account <Link to="/login" className='text-blue-600'>Login</Link></h3>
                </div>
                <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Input
                    label="Email: "
                    placeholder="Enter your Email..."
                    {...register("email", {
                        required: true,
                    })}
                />
                <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your Password..."
                    {...register("password", {
                        required: true,
                    })}
                />
                <Button type="submit" className="w-full">{loading ? (
                    <FiLoader className="animate-spin text-white text-2xl mx-auto" />
                ) : "Create Account"}</Button>
            </form>
        </div>
    )
}

export default Signup