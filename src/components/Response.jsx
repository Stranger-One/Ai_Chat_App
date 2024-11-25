import parse from 'html-react-parser';
import { SiGooglegemini } from "react-icons/si";
import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { TextPlugin } from "gsap/TextPlugin";

// gsap.registerPlugin(TextPlugin);

const Response = ({ resp }) => {
    const textBoxRef = useRef(null);
    const containerRef = useRef(null)
    // const dur = resp.length / 100
    // console.log(dur)
    // console.log(resp.split(' '));

    // let textArr = resp.split(' ')



    // const [showText, setShowText] = useState('')

    // useEffect(()=>{
    //     setInterval(() => {
    //         for(let i=0; i<textArr.length; i++){
    //             setShowText(text => text + textArr[i])
    //         }
    //     }, dur);
    // })    

    // useEffect(() => {
    //     // if (textBoxRef.current) {
    //     //     gsap.to(textBoxRef.current, {
    //     //         text: {
    //     //             value: resp,
    //     //             delimiter: ' ',
    //     //         },
    //     //         duration: dur,
    //     //     });
    //     // }
    //     if (containerRef.current) {
    //         containerRef.current.scrollTop = containerRef.current.scrollHeight;
    //     }
    // }, [showText]);

    return (
        <div ref={containerRef} className='answer w-full lg:w-[80%] self-start rounded-md p-2 mb-4 lg:flex gap-2'>
            <div className="rounded-full border-[1px] h-7 w-7 flex items-center justify-center flex-shrink-0 mb-2 lg:mb-0">
                <SiGooglegemini className='text-white' />
            </div>
            <p ref={textBoxRef} className='text-lg text-white/80 leading-tight font-light'>
                {/* Content will be animated into this box */}
                {parse(resp)}
            </p>
        </div>
    );
};

export default Response;
