import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootComponent from './RootComponent'
import { persistor, store } from './store/reducers/store'
import { v4 as uuidv4 } from 'uuid'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate key={uuidv4()} loading={null} persistor={persistor}>
                <RootComponent key={uuidv4()} />
            </PersistGate>
        </Provider>
    )
}

export default App
