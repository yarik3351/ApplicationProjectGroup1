import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getAuth, signOut, signInWithCustomToken, signInWithCredential } from 'firebase/auth'
import { getApp } from 'firebase/app'
import { FIREBASE } from '../resources/firebase-constants'

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
    const auth = getAuth()
    // console.log(auth)
    const location = useLocation()
    // const navigate = useNavigate()
    const idToken = sessionStorage.getItem('AuthJwtToken')

    if (!idToken) {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                console.log(error)
            })
        localStorage.removeItem('FYFUserId')
        sessionStorage.removeItem('AuthJwtToken')
        if (!location.pathname.includes('login') && !location.pathname.includes('register')) return <Navigate to="/login" state={{ from: location }} replace />
    }

    auth.onAuthStateChanged((user: any) => {
        // console.log(user)
        if (!user || !localStorage.getItem('FYFUserId')) {
            return <Navigate to="/login" state={{ from: location }} replace />
        } else if (user) {
            sessionStorage.setItem('AuthJwtToken', user.stsTokenManager.accessToken)
            localStorage.setItem('FYFUserId', user.uid)
        }
    })

    return children
}

export default RequireAuth
