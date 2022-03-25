import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { getAuth } from 'firebase/auth'

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
    } else {
        if (location.pathname.includes('login') || location.pathname.includes('register')) return <Navigate to="/" state={{ from: location }} replace />
    }

    auth.onAuthStateChanged((user: any) => {
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
