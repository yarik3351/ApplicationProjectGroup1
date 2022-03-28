import React, { useEffect } from 'react'
import '../styles/Chat.css'
import { useForm, formList } from '@mantine/form'
import { Textarea, Button, Group, Box } from '@mantine/core'
import { v4 as uuidv4 } from 'uuid'

// const ChatData = {}

const MessageInput: React.FC = () => {
    const [message, setMessage] = React.useState<any>('')

    return (
        <Textarea key={uuidv4()} className="input-txt" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Type a message..." />
    )
}

export default MessageInput
