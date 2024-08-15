import React from 'react'

const Header = () => {
  return (
    <header className='w-full h-14 bg-transparent shadow-sm shadow-white/40 z-10 relative'>
        <nav className='w-full h-full px-5 flex items-center justify-between '>
            <div className="logo h-10 w-10 rounded-full overflow-hidden">
                <img src="/ai-logo.jpg" alt="" className='h-full object-bottom' />
            </div>
            <div className='border border-white/70 px-20 py-1 rounded-lg'>
              <h2 className='text-white/80 text-lg'>Ai_Chat_App</h2>
            </div>
            <button className='py-[6px] px-8 bg-[#299FF4] text-lg rounded-lg '>Log in</button>
        </nav>
    </header>
  )
}

export default Header