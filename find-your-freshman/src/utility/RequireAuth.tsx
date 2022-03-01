import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
    const auth = getAuth()
    const location = useLocation()
    // const navigate = useNavigate()

    auth.onAuthStateChanged((user) => {
        if (!user || !localStorage.getItem('FYFUserId')) {
            // console.log('state = definitely signed out', user)
            return <Navigate to="/login" state={{ from: location }} replace />
            // return navigate('/login', { replace: true })
        } else {
            // console.log('state = definitely signed in', user)
        }
    })

    return children
}

export default RequireAuth
