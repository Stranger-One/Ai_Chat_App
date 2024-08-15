import React from 'react'
import { FiEdit } from "react-icons/fi";


const History = () => {
    return (
        <section className=' p-2 border-r-[1px]'>
            <div className="w-full h-12 bg-zinc-800 rounded-md flex justify-between items-center px-2">
                <div className=" h-10 rounded-full ">
                    <img src="/User-Profile.png" alt="" className='h-full' />
                </div>
                <div className="">
                    <FiEdit className='text-white text-xl'/>
                </div>
            </div>
            <hr className='my-2' />
            <div className="History-List w-full flex flex-col gap-2">
                <li className='list-none px-2 py-2 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  </li>
                <li className='list-none px-2 py-2 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  </li>
                <li className='list-none px-2 py-2 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  </li>
                <li className='list-none px-2 py-2 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  </li>
                <li className='list-none px-2 py-2 rounded-lg text-white/60 hover:text-white cursor-pointer bg-zinc-800  truncate'>Lorem ipsum dolor sit. Lorem ipsum dolor sit amet consectetur adipisicing elit.  </li>
            </div>
        </section>
    )
}

export default History