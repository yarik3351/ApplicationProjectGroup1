import React from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

// const ChatData = {}

const Chat: React.FC = () => {
    const { id } = useParams()
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div key={uuidv4()} style={{ alignSelf: 'start' }}>
                Message from someone
            </div>
            {id}
            <div key={uuidv4()} style={{ alignSelf: 'end' }}>
                My message
            </div>
        </div>
    )
}

export default Chat
