import React from 'react';
import './App.css';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/translate';

class App extends React.Component {
    constructor(props){
        super(props);
        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
    }

    render() {
        return (
            <I18nProvider locale={this.locale}>
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <h1 className="logo"> RELATABLE </h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <h5 className="catchphrase">{translate("catchphrase")}</h5>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-5">
                        <Col xs="auto">
                              <Button className="m-3" size="lg" variant="success" href="/browse">{translate("browse")}</Button>{' '}
                              <Button className="m-3" size="lg" variant="info" href="/create">{translate("create")}</Button>{' '}
                        </Col>
                    </Row>
                </Container>
            </I18nProvider>
        );
    }
}

export default App;
