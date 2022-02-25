import React from 'react'
import DateDisplay from '../components/DateDisplay'
import { v4 as uuidv4 } from 'uuid'

const HomePage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 key={uuidv4()} style={{ fontSize: '4em' }}>
                Hello world!
            </h1>
            <DateDisplay key={1} />
        </div>
    )
}

export default HomePage
