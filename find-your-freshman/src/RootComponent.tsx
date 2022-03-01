import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'
import Login from './pages/Login'
import { v4 as uuidv4 } from 'uuid'
import RequireAuth from './utility/RequireAuth'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'

const RootComponent: React.FC = () => {
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
                        <Nav.Link href="/login" key={uuidv4()}>
                            Login
                        </Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end" key={uuidv4()}>
                        <Button variant="outline-light" size="sm" key={uuidv4()}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Router>
                <Routes key={uuidv4()}>
                    <Route key={uuidv4()} path="*" element={<NotFoundPage />} />
                    <Route
                        key={uuidv4()}
                        path={ROUTES.HOMEPAGE_ROUTE}
                        element={
                            <RequireAuth>
                                <HomePage key={uuidv4()} />
                            </RequireAuth>
                        }
                    />
                    <Route key={uuidv4()} path={ROUTES.LOGIN_ROUTE} element={<Login />} />
                </Routes>
            </Router>
        </>
    )
}

export default RootComponent
