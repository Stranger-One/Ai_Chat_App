import React, { useEffect, useRef, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
import { conf } from '../conf/conf.js'
import Request from './Request.jsx';
import Response from './Response.jsx';
import { FiLoader } from "react-icons/fi";



const Chat = () => {
    const inputRef = useRef()
    const chatBox = useRef()
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)

    const handleRequest = async () => {
        const request = inputRef.current.value
        try {
            /*
            * Install the Generative AI SDK
            *
            * $ npm install @google/generative-ai
            */

            // console.log(request);
            // addRequest(request)
            setLoading(true)

            setChats((curChats) => [...curChats, <Request req={request} />])
            inputRef.current.value = ''

            const apiKey = conf.geminiApiKey;
            const genAI = new GoogleGenerativeAI(apiKey);

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });

            const generationConfig = {
                temperature: 1,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            };

            const chatSession = model.startChat({
                generationConfig,
                // safetySettings: Adjust safety settings
                // See https://ai.google.dev/gemini-api/docs/safety-settings
                history: [
                ],
            });

            const result = await chatSession.sendMessage(request);
            const response = result.response.text()
            // console.log(response);
            if (response) {
                setChats((curChats) => [...curChats, <Response resp={response} />])
            }

            setLoading(false)
        } catch (error) {
            console.error("Something went wrong", error);
        }

    };

    useEffect(() => {
        if (chatBox.current) {
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
        }
    }, [chats])


    return (
        <section className='w-full h-full relative'>
            <div className="relative w-full h-full pb-2 ">
                {chats.length > 0 ?
                    <div ref={chatBox} className='w-full h-[80vh] flex flex-col custom-scrollbar overflow-auto relative px-4 pt-4'>
                        {chats.map((chat, index) => (
                            <React.Fragment key={index}>{chat}</React.Fragment>
                        ))}
                    </div> :
                    <div className='w-full h-full flex flex-col items-center justify-center'>
                        <h1 className='text-white/80 text-3xl'>I am ready to answer you...</h1>
                        <h1 className='text-white/50 text-xl'>Ask whatever you want </h1>
                    </div>}

            </div>
            <div className="w-[80%] grid grid-cols-[auto_140px] rounded-lg overflow-hidden border p-2 absolute bottom-3 left-1/2 -translate-x-1/2 ">
                <input ref={inputRef} type="text" placeholder='Ask me anything ...' className='px-6 outline-none border-none bg-transparent text-white/80 ' />
                <button onClick={handleRequest} disabled={loading} className='py-[6px] px-8 bg-[#299FF4] rounded-lg text-lg flex flex-nowrap items-center justify-center gap-2 '>
                    {loading ? (
                        <FiLoader className="animate-spin" />
                    ) : (
                        <>
                            Send <IoIosSend className="ml-2" />
                        </>
                    )}

                </button>
            </div>
        </section>
    )
}

export default Chat