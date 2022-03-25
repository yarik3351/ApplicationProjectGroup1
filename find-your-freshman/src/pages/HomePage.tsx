import React from 'react'
import DateDisplay from '../components/DateDisplay'
import { v4 as uuidv4 } from 'uuid'

import { Button, Card } from 'react-bootstrap'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

const HomePage: React.FC = () => {
    const [posts, setPosts] = React.useState<any>([])

    const getPosts = async () => {
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, 'posts'))
        querySnapshot.forEach((doc) => {
            setPosts([...posts, doc.data]) // doesn't add anything to posts for some reason
        })
    }

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
            <h3 key={uuidv4()} style={{ fontSize: '4em' }}>
                My Feed
            </h3>
            <Card key={uuidv4()} style={{ width: '18rem' }}>
                <Card.Img key={uuidv4()} variant="top" src="" />
                <Card.Body key={uuidv4()}>
                    <Card.Title key={uuidv4()}>by John Doe</Card.Title>
                    <Card.Text key={uuidv4()}>This is post content</Card.Text>
                    <Button key={uuidv4()} variant="primary" onClick={getPosts}>
                        Posts to State
                    </Button>
                </Card.Body>
            </Card>
            <DateDisplay key={uuidv4()} />
        </div>
    )
}

export default HomePage
