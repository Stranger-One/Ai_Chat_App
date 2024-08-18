import React, { useEffect } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/authService'
import { useDispatch } from 'react-redux'
import { loginContext } from './store/authSlice'
import { closeMenu, openMenu } from './store/menuSlice'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const initiate = async () => {
      let curUser = await authService.getCurUser()
      // console.log(curUser)
      if (curUser) {
        dispatch(loginContext(curUser))
      }
      // console.log('App Mounted')
    };
    initiate()
  }, [])

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < 768) {
      dispatch(closeMenu());
    } else if (width < 1000) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Call handler once on mount to set initial value
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch])

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