import React from 'react';
import '../App.css';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

function Browse() {
    const locale = localStorage.getItem('locale') || LOCALES.ENGLISH
    return (
        <I18nProvider locale={locale}>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h2 className="text-info">{translate("relatable?")}</h2>
                    </Col>
                </Row>
                <Card className="mt-5">
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p className="text-center">
                                {' '}
                                LLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.{' '}
                            </p>
                            <footer className="blockquote-footer">
                                <cite title="Source Title">Anonymous</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
                <Row className="justify-content-md-center mt-5">
                    <Col md="auto">
                          <Button size="lg" variant="info" href="/browse" className="mr-5">{translate("so_relatable")}</Button>{' '}
                          <Button size="lg" variant="danger" href="/create">{translate("not_relatable")}</Button>{' '}
                    </Col>
                </Row>
            </Container>
        </I18nProvider>
    );
}

export default Browse;
