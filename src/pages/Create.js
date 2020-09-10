import React from 'react';
import '../App.css';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            relatableText: '',
            username: 'Anonymous Genius',
        };

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
    }

    handleChangeText(event) {
        this.setState({
            relatableText: event.target.value,
        });
    }

    handleChangeUsername(event) {
        this.setState({
            username: event.target.value,
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.username);
        alert('A name was submitted I mean text: ' + this.state.relatableText);
        event.preventDefault();
    }

    render() {
        return (
            <I18nProvider locale={this.locale}>
                <Container className="mt-5">
                    <Row className="justify-content-md-center mb-5">
                        <Col md="auto">
                            <h2 className="text-info">{translate("create")}</h2>
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Row className="d-flex justify-content-md-center">
                            <Col sm={7} className="my-1">
                                <Form.Group>
                                    <Form.Control placeholder="This text is so relatable" maxLength="200" as="textarea" rows="3" value={this.state.relatableText} onChange={this.handleChangeText} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-md-center">
                            <Col sm={4} className="my-1">
                                <Form.Control className="mb-2" md="4" maxLength="40" value={this.state.username} onChange={this.handleChangeUsername} />
                            </Col>
                            <Col sm={3} className="my-1">
                                <Button type="submit">{translate("submit")}</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </I18nProvider>
        );
    }
}

export default Create;
