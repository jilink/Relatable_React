import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

function MainNavbar(){
    function swapLanguage () {
        if (locale===LOCALES.FRENCH) {
            localStorage.setItem('locale', LOCALES.ENGLISH);
            window.location.reload(false);
        }
        else {
            localStorage.setItem('locale', LOCALES.FRENCH);
            window.location.reload(false);
        }
    }

    const locale = localStorage.getItem('locale') || LOCALES.ENGLISH

    return (
        <I18nProvider locale={locale}>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/">Relatable</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link onClick={swapLanguage}>{translate("swaplang")}</Nav.Link>
                </Nav>
            </Navbar>
        </I18nProvider>
    );
}

export default MainNavbar;
