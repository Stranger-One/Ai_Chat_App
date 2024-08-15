import React from 'react'

const Response = ({resp}) => {
    return (
        <div className='answer max-w-[80%] self-start bg-slate-600/20 rounded-md p-2 mb-4 '>
            <p className='text-lg text-white/80 leading-tight'>{resp}</p>
        </div>
    )
}

export default Response