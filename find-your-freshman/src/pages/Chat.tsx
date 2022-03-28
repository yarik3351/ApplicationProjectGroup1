import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { FIREBASE } from '../resources/firebase-constants'
import '../styles/Chat.css'
import { Button, Box } from '@mantine/core'
import { Form } from 'react-bootstrap'
import { doc, getFirestore, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import Message from '../components/Message'

const Chat: React.FC = () => {
    const { id } = useParams()
    const [user, setUser] = React.useState<any>({})
    const [newMessage, setNewMessage] = React.useState<any>('')
    const [chatData, setChatData] = React.useState<any>({})
    const [messages, setMessages] = React.useState<any>([])
    const db = getFirestore(FIREBASE.APP)

    const handleNewMessage = (e: any) => {
        setNewMessage(e.target.value)
    }

    useEffect(() => {
        FIREBASE.AUTH.onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user)
            }
        })

        let unsub: any = null
        if (id) {
            unsub = onSnapshot(doc(db, 'chats', id), (doc) => {
                if (doc) {
                    const chatData = doc.data()
                    setChatData(chatData)
                    if (chatData) setMessages(chatData.messages)
                }
            })
        }
        console.log(chatData)

        return () => {
            if (unsub) unsub()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        if (user && newMessage && id) {
            const newMessageData = {
                uid: user.uid,
                message_text: newMessage
            }

            const messagesRef = doc(db, 'chats', id)

            // add a new message
            await updateDoc(messagesRef, {
                messages: arrayUnion(newMessageData)
            })

            setNewMessage('')
        }
    }

    const controls = (
        <Box key={4} mx="auto">
            <Form className="controls" key={3}>
                <Form.Group controlId="message" className="input-txt" key={2}>
                    <Form.Control type="text" placeholder="Type a message..." key={1} value={newMessage} onChange={handleNewMessage} />
                </Form.Group>
                <Button key={5} type="submit" onClick={handleSubmit}>
                    Send
                </Button>
            </Form>
        </Box>
    )

    return (
        <>
            <h2>{chatData.label}</h2>
            <div className="chat-box">
                <div className="msg-cont" key={uuidv4()}>
                    {messages.map((message: any, index: any) => {
                        return <Message key={index} message={message} uid={user.uid} />
                    })}
                </div>
                <div key={6}>{controls}</div>
            </div>
        </>
    )
}

export default Chat
