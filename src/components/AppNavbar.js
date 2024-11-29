import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from '../pages/LogoutButton';

export default function AppNavbar() {
    const { user } = useContext(AuthContext);  // Access user from context

    return (
        <Navbar expand="lg" className="navbar bg-warning bg-gradient text-black fw-semibold">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-semibold">FitTrack: Your Personal Fitness Journey</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto navbar">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        { user ? (
                            <>
                                <Nav.Link as={NavLink} to="/workouts">Workouts</Nav.Link>
                                <LogoutButton />
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="bg-primary bg-gradient text-white fw-bold rounded px-4 me-2">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="bg-primary bg-gradient text-white fw-bold bg-danger bg-gradient rounded px-4">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
