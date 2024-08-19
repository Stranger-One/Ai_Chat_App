import React, { useState } from 'react'
import History from './History'
import Chat from './Chat'
import { FiLoader } from "react-icons/fi";


const Home = () => {
    const [pageLoading, setPageLoading] = useState(false)
    return (
        <>
            <History setPageLoading={setPageLoading} />
            <Chat setPageLoading={setPageLoading} />

            <div className={`w-full h-[90vh] bg-zinc-800/90 backdrop-blur-sm absolute z-10 flex items-center justify-center ${pageLoading ? "block" : "hidden"}`}>
                <FiLoader className="animate-spin text-white text-2xl mx-auto" />
            </div>
        </>
    )
}

export default Home