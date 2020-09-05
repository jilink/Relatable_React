import React from 'react';
import { Navbar, Nav, FormControl, Button, Form } from 'react-bootstrap';

function MainNavbar(){
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/en">Relatable</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default MainNavbar;
