import React from 'react'
import Header from './components/Header'
import History from './components/History'
import Chat from './components/Chat'

const App = () => {
  return (
    <section className='w-full h-screen bg-zinc-900 grid grid-rows-[56px_auto] duration-200 '>
      <Header />
      <main className='w-full grid grid-cols-[250px_auto] '>
        <History />
        <Chat />
      </main>
    </section>
  )
}

export default App