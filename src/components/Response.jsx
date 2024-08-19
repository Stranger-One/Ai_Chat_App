import parse from 'html-react-parser';
import { SiGooglegemini } from "react-icons/si";

const Response = ({ resp }) => {

    return (
        <div className='answer max-w-[80%] self-start  rounded-md p-2 mb-4 flex gap-2'>
            <div className="rounded-full border-[1px] h-7 w-7 flex items-center justify-center flex-shrink-0">
                <SiGooglegemini className='text-white' />
            </div>
            <p className='text-lg text-white/80 leading-tight font-light'>
                {parse(resp)}
            </p>
        </div>
    )
}

export default Response