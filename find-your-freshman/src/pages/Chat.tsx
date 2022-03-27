import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const ChatData = {}

const Chat: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div key={uuidv4()} style={{ alignSelf: 'start' }}>
                Message from someone
            </div>
            <div key={uuidv4()} style={{ alignSelf: 'end' }}>
                My message
            </div>
        </div>
    )
}

export default Chat
