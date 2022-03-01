import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider, EmailAuthProvider, PhoneAuthProvider } from 'firebase/auth'

import Container from 'react-bootstrap/Container'
import { useLocation, useNavigate } from 'react-router-dom'
import { FIREBASE } from '../resources/firebase-constants'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { constants } from 'fs'

const Login: React.FC = () => {
    const createNewUser = async (userData: any) => {
        const db = getFirestore()
        try {
            const profile = userData?.additionalUserInfo?.profile

            await addDoc(collection(db, 'users'), {
                last_name: profile['family_name'],
                first_name: profile['family_name'],
                id: userData.user['uid'],
                language: profile['locale'],
                display_name: profile['name'],
                profile_picture: profile['picture'],
                verified_email: profile['verified_email'],
                email: profile['email'],
                phone: userData.user['phoneNumber'],
                age: null,
                city: null,
                country: null,
                country_from: null
            })
        } catch (e) {
            console.error('Error creating user: ', e, userData)
        }
    }

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult: any, redirectUrl: any) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                console.log(authResult, redirectUrl)
                if (authResult.additionalUserInfo.isNewUser) {
                    createNewUser(authResult)
                }

                localStorage.setItem('FYFUserId', authResult.user.uid)

                // eslint-disable-next-line react-hooks/rules-of-hooks
                /*                 const location: any = useLocation()
                const from = location.state?.from?.pathname || '/'
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const navigate = useNavigate()
                if (from) {
                    navigate(from, { replace: true })
                } */
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
