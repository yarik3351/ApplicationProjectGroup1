import { initializeApp } from 'firebase/app'
import * as firebaseui from 'firebaseui'
import { getAuth } from 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'

export const FIREBASE = {
    APP: initializeApp({
        apiKey: 'AIzaSyB2o9Y-m0XG2ZFHYFd8Uf4Bm3Gko3vf1eE',
        authDomain: 'find-your-freshman.firebaseapp.com',
        projectId: 'find-your-freshman',
        storageBucket: 'find-your-freshman.appspot.com',
        messagingSenderId: '821467910557',
        appId: '1:821467910557:web:baa01d383eb23c053b1f74'
    }),
    CONFIG: {
        apiKey: 'AIzaSyB2o9Y-m0XG2ZFHYFd8Uf4Bm3Gko3vf1eE',
        authDomain: 'find-your-freshman.firebaseapp.com',
        projectId: 'find-your-freshman',
        storageBucket: 'find-your-freshman.appspot.com',
        messagingSenderId: '821467910557',
        appId: '1:821467910557:web:baa01d383eb23c053b1f74'
    },
    UI: new firebaseui.auth.AuthUI(getAuth()),
    AUTH: getAuth()
}
