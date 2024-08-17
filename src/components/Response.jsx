import React, { useEffect, useRef, useState } from 'react'
import parse from 'html-react-parser';

const Response = ({ resp }) => {
    
    return (
        <div className='answer max-w-[80%] self-start bg-slate-600/20 rounded-md p-2 mb-4 '>
            <p className='text-lg text-white/80 leading-tight'>
                {parse(resp)}
            </p>
        </div>
    )
}

export default Response