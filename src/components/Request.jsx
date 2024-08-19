import React from 'react'

const Request = ({req}) => {
    return (
        <div className="question max-w-[60%] self-end bg-zinc-800 rounded-full px-4 py-2 mb-4 ">
            <p className='text-lg text-white/80 leading-tight'>{req}</p>
        </div>
    )
}

export default Request