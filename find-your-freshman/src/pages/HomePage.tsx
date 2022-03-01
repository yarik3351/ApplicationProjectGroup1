import React from 'react'
import DateDisplay from '../components/DateDisplay'
import { v4 as uuidv4 } from 'uuid'
import { FIREBASE } from '../resources/firebase-constants'
import { signOut } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

const HomePage: React.FC = () => {
    const logout = () => {
        signOut(FIREBASE.AUTH)
            .then(() => {
                console.log('sign out')
                localStorage.removeItem('FYFUserId')
                return <Navigate to="/login" replace />
            })
            .catch((error) => {
                // An error happened.
            })
    }

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 key={uuidv4()} style={{ fontSize: '4em' }}>
                Hello world!
            </h1>
            <DateDisplay key={uuidv4()} />
            <button key={uuidv4()} title="LOGOUT" onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default HomePage
