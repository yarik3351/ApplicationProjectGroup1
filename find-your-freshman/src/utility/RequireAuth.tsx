import React, { useContext, createContext, useState } from 'react'
import { FIREBASE } from '../resources/firebase-constants'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = getAuth()
    const location = useLocation()
    const navigate = useNavigate()

    auth.onAuthStateChanged((user) => {
        console.log(user, localStorage.getItem('FYFUserId'))
        if (!user || !localStorage.getItem('FYFUserId')) {
            console.log('state = definitely signed out', user)
            return <Navigate to="/login" state={{ from: location }} replace />
        } else {
            console.log('state = definitely signed in', user)
        }
    })

    return children
}

export default RequireAuth
