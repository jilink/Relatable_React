import React from 'react';
import '../App.css';

import { Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

import firebase from 'firebase/app'
import 'firebase/database';
import config from '../config'

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            relatableText: '',
            username: 'Anonymous Genius',
            success: false,
            failure: false,
        };

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
        this.category = "general"

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
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
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (!this.state.relatableText){
            this.setState({failure: true, success: false, relatableText: ''})
        }
        else {
            firebase.database().ref(this.locale +'/' + this.category ).push().set({
                username: this.state.username,
                text: this.state.relatableText,
                up: 0,
                down: 0,
                date: date,
                timestamp: Date.now(),
                id: Math.random().toString(36).substr(2, 9),
            })
                .then((doc) => {
                    this.setState({success: true, failure:false, relatableText: ''})
                })
                .catch((error) => {
                    console.error(error);
                })
        }

        event.preventDefault();
    }

    render() {
        return (
            <I18nProvider locale={this.locale}>
            {this.state.success ?
                    <Alert variant="success" className="text-center">
                        {translate("sent")}
                    </Alert>
            : null}
            {this.state.failure ?
                    <Alert variant="danger" className="text-center">
                        {translate("failure")}
                    </Alert>
            : null}
                <Container className="mt-5">
                    <Row className="justify-content-center mb-5">
                        <Col xs="auto">
                            <h2 className="text-info">{translate("create")}</h2>
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Row className="d-flex justify-content-center">
                            <Col sm={7} className="my-1">
                                <Form.Group>
                                    <Form.Control maxLength="200" as="textarea" rows="3" value={this.state.relatableText} onChange={this.handleChangeText} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center">
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
