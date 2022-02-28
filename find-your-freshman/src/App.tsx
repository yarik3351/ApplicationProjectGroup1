import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './RootComponent'
import { persistor, store } from './store/reducers/store'
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from 'firebase/app'

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

const App: React.FC = () => {
    const firebaseConfig = {
        apiKey: 'AIzaSyB2o9Y-m0XG2ZFHYFd8Uf4Bm3Gko3vf1eE',
        authDomain: 'find-your-freshman.firebaseapp.com',
        projectId: 'find-your-freshman',
        storageBucket: 'find-your-freshman.appspot.com',
        messagingSenderId: '821467910557',
        appId: '1:821467910557:web:baa01d383eb23c053b1f74'
    }

    const app = initializeApp(firebaseConfig)

    return (
        <Provider store={store}>
            <PersistGate key={uuidv4()} loading={null} persistor={persistor}>
                <RootComponent key={uuidv4()} />
            </PersistGate>
        </Provider>
    )
}

export default App
