import React from 'react'
import History from './History'
import Chat from './Chat'


const Home = ({isNew}) => {
    return (
        <>
            <History />
            <Chat isNew={isNew} />
        </>
    )
}

export default Home