import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { FIREBASE } from '../resources/firebase-constants'
import '../styles/Chat.css'
import { useForm, formList } from '@mantine/form'
import { Textarea, Button, Group, Box } from '@mantine/core'
import MessageInput from '../components/MessageInput'

// const ChatData = {}

const Chat: React.FC = () => {
    const { id } = useParams()
    const [user, setUser] = React.useState<any>({})
    const [message, setMessage] = React.useState<any>('')

    useEffect(() => {
        FIREBASE.AUTH.onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user)
            }
        })
    }, [])

    const handleSubmit = (event: any) => {
        event.preventDefault()

        if (user && message) {
            const newMessage = {
                uid: user.uid,
                message_text: message
            }

            setMessage('')
        }
    }

    const form = useForm({
        initialValues: { message: '' }
    })

    const controls = (
        <Box key={uuidv4()} mx="auto">
            <form key={uuidv4()} onSubmit={form.onSubmit((values) => console.log(values))} className={'controls'}>
                <MessageInput key={uuidv4()} />
                {/* <Textarea key={uuidv4()} className="input-txt" required placeholder="Type a message..." {...form.getInputProps('message')} /> */}
                <Button key={uuidv4()} type="submit" onClick={handleSubmit}>
                    Send
                </Button>
            </form>
        </Box>
    )

    return (
        <>
            Label
            <div className="chat-box">
                <div className="msg-cont" key={uuidv4()}>
                    <div className="smn-msg" key={uuidv4()} style={{ alignSelf: 'start' }}>
                        Message from someone
                    </div>
                    <div className="my-msg" key={uuidv4()} style={{ alignSelf: 'end' }}>
                        My message
                    </div>
                    <div className="smn-msg" key={uuidv4()} style={{ alignSelf: 'start' }}>
                        Message from someone
                    </div>
                </div>
                <div key={uuidv4()}>{controls}</div>
            </div>
        </>
    )
}

export default Chat
