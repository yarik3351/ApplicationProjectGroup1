import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { FIREBASE } from '../resources/firebase-constants'

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
    const auth = FIREBASE.AUTH
    // console.log(auth)
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
    } else if (idToken && !auth.currentUser) {
        // auth.re
    } else {
        if (location.pathname.includes('login') || location.pathname.includes('register')) return <Navigate to="/" state={{ from: location }} replace />
    }

    auth.onIdTokenChanged(function (user: any) {
        if (user) {
            user.getIdToken().then((token: any) => {
                sessionStorage.setItem('AuthJwtToken', token)
            })
            sessionStorage.setItem('AuthRefreshToken', user.stsTokenManager.refreshToken)

            localStorage.setItem('FYFUserId', user.uid)
        }
    })

    auth.onAuthStateChanged((user: any) => {
        if (user) {
            user.getIdToken().then((token: any) => {
                sessionStorage.setItem('AuthJwtToken', token)
            })
            sessionStorage.setItem('AuthRefreshToken', user.stsTokenManager.refreshToken)
            localStorage.setItem('FYFUserId', user.uid)
        }
    })

    return children
}

export default RequireAuth
