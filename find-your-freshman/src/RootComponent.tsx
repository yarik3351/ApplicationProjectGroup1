import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import Profile from './pages/Profile'
import Login from './pages/Login'

import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'

import { v4 as uuidv4 } from 'uuid'
import RequireAuth from './utility/RequireAuth'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { signOut } from 'firebase/auth'
import { FIREBASE } from './resources/firebase-constants'
import { useNavigate } from 'react-router-dom'

const RootComponent: React.FC = () => {
    const navigate = useNavigate()
    const authToken = sessionStorage.getItem('AuthJwtToken')
    const logout = () => {
        signOut(FIREBASE.AUTH)
            .then(() => {
                localStorage.removeItem('FYFUserId')
                sessionStorage.removeItem('AuthJwtToken')
                navigate('/login')
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const login = () => {
        navigate('/login')
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container key={uuidv4()}>
                    <Navbar.Brand href="/" key={uuidv4()}>
                        FYF
                    </Navbar.Brand>
                    <Nav className="me-auto" key={uuidv4()}>
                        <Nav.Link href="/" key={uuidv4()}>
                            Home
                        </Nav.Link>
                        <Nav.Link href="/profile" key={uuidv4()}>
                            Profile
                        </Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end" key={uuidv4()}>
                        {!!authToken && (
                            <Button variant="outline-light" size="sm" key={uuidv4()} onClick={logout}>
                                Logout
                            </Button>
                        )}
                        {!authToken && (
                            <Button variant="outline-light" size="sm" key={uuidv4()} onClick={login}>
                                Login
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <RequireAuth>
                <Routes key={uuidv4()}>
                    <Route key={uuidv4()} path="*" element={<NotFoundPage />} />
                    <Route key={uuidv4()} path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage key={uuidv4()} />} />
                    <Route key={uuidv4()} path={ROUTES.LOGIN_ROUTE} element={<Login />} />
                    <Route key={uuidv4()} path={ROUTES.PROFILE_ROUTE} element={<Profile />} />
                </Routes>
            </RequireAuth>
        </>
    )
}

export default RootComponent
