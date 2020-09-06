import React from 'react';
import '../App.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

function Create() {
    const locale = localStorage.getItem('locale') || LOCALES.ENGLISH
    return (
        <I18nProvider locale={locale}>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1 className="logo"> CREATE </h1>
                    </Col>
                </Row>
            </Container>
        </I18nProvider>
    );
}

export default Create;
