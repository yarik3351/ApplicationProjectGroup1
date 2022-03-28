import React from 'react'
import '../styles/Chat.css'

const Message: any = ({ message, uid }: any) => {
    if (message.uid === uid) {
        return (
            <div className="smn-msg" style={{ alignSelf: 'end' }}>
                {message.message_text}
            </div>
        )
    } else {
        return (
            <div className="my-msg" style={{ alignSelf: 'start' }}>
                {message.message_text}
            </div>
        )
    }
}

export default Message
