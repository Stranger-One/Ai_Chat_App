import React, { useEffect } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/authService'
import { useDispatch } from 'react-redux'
import { loginContext } from './store/authSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect( ()=>{
    const initiate = async () => {
      let curUser = await authService.getCurUser()
      // console.log(curUser)
      if(curUser){
        dispatch(loginContext(curUser))
      }
      // console.log('App Mounted')
    };
    initiate()


  }, [])
  
  return (
    <section className='w-full h-screen bg-zinc-900 grid grid-rows-[10vh_90vh] duration-200 '>
      <Header />
      <main className='w-full relative flex'>
        <Outlet />
      </main>
    </section>
  )
}

export default App