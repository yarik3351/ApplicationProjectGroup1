import React from 'react'
import DateDisplay from '../components/DateDisplay'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const authToken = sessionStorage.getItem('Auth Token')

        if (!authToken) {
            navigate('/login')
        }
    }, [])

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 key={uuidv4()} style={{ fontSize: '4em' }}>
                Hello world!
            </h1>
            <DateDisplay key={uuidv4()} />
        </div>
    )
}

export default HomePage
