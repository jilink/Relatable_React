import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

function MainNavbar(){
    return (
        <I18nProvider locale={LOCALES.ENGLISH}>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/en">Relatable</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">{translate("login")}</Nav.Link>
                    <Nav.Link href="/login">{translate("connected", {name:"john"})}</Nav.Link>
                </Nav>
            </Navbar>
        </I18nProvider>
    );
}

export default MainNavbar;
