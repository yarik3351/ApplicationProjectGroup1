import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from 'firebase/auth'
import { setCurrentUser } from '../store/actions/data'
import Container from 'react-bootstrap/Container'
import { FIREBASE } from '../resources/firebase-constants'
import { useDispatch } from 'react-redux'

const Login: React.FC = () => {
    useEffect(() => {
        FIREBASE.UI.start('#firebaseui-auth-container', uiConfig)
    })
    const dispatch = useDispatch()

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult: any) {
                // const navigate = useNavigate()
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                sessionStorage.setItem('AuthJwtToken', authResult.user.stsTokenManager.accessToken)
                dispatch(setCurrentUser(authResult.user))

                localStorage.setItem('FYFUserId', authResult.user.uid)

                // eslint-disable-next-line react-hooks/rules-of-hooks
                /*                 const location: any = useLocation()
                const from = location.state?.from?.pathname || '/'
                // eslint-disable-next-line react-hooks/rules-of-hooks
                if (from) {
                    navigate(from, { replace: true })
                } */
                // navigate('/home')

                return true
            },
            uiShown: function () {
                // The widget is rendered.
                // Hide the loader.
                const loader = document.getElementById('loader') || { style: { display: null } }
                loader.style.display = 'none'
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            GoogleAuthProvider.PROVIDER_ID,
            FacebookAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID
        ]
    }

    return (
        <Container>
            <div key={uuidv4()} id="firebaseui-auth-container"></div>
            <div key={uuidv4()} id="loader">
                Loading...
            </div>
        </Container>
    )
}

export default Login
