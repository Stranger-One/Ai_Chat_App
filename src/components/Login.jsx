import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import authService from '../appwrite/authService'
import { loginContext } from '../store/authSlice'


const Login = () => {
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (data) => {
        console.log(data);
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurUser()
                // console.log(userData)
                if (userData) {
                    dispatch(loginContext(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            // setError(error.message)
        }
    };

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <form onSubmit={handleSubmit(login)} className='w-[300px] h-[450px] flex flex-col items-center justify-between text-white '>
                <div className='w-16 h-16 rounded-full'>
                    <img src="/User-Profile.png" alt="" />
                </div>
                <div className="">
                    <h3 className='text-white'>Don't have an account <Link to="/signup" className='text-blue-600'>Sign up</Link></h3>
                </div>
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
                <Button type="submit" className="w-full">Login</Button>
            </form>
        </div>
    )
}

export default Login