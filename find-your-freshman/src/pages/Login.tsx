import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getAuth } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, EmailAuthProvider, PhoneAuthProvider } from 'firebase/auth'

import Container from 'react-bootstrap/Container'

import { FIREBASE } from '../resources/firebase-constants'
import { constants } from 'fs'

const Login: React.FC = () => {
    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult: any, redirectUrl: any) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
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
    FIREBASE.UI.start('#firebaseui-auth-container', uiConfig)

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
