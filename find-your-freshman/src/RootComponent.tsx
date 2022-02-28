import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import Login from './pages/Login'

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes key={1}>
                <Route key={2} path="*" element={<NotFoundPage />} />
                <Route key={3} path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                <Route key={4} path={ROUTES.LOGIN_ROUTE} element={<Login />} />
            </Routes>
        </Router>
    )
}

export default RootComponent
