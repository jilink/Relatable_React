import React from 'react';
import '../App.css';

import { Container, Row, Col, Button, Form, Alert} from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

import config from '../config'
import firebase from 'firebase/app'
import 'firebase/database';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            failure: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
        this.category = "general"

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    signup(event){
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
            if(user) {
                const update = {
                    displayName: this.state.username,
                };
                user.user.updateProfile(update).then((u) => {
                    window.location.href = "/";
                });
            }
        }).catch((error) => {
            this.setState({failure: error.code})
        });
    }

    render() {
        return (
            <I18nProvider locale={this.locale}>
                {this.state.failure ?
                    <Alert variant="danger" className="text-center">
                        {translate(this.state.failure)}
                    </Alert>
                    : null}
                <Container className="mt-5">
                    <Form onSubmit={this.signup}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>{translate('Email address')}</Form.Label>
                            <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" autoComplete="on" required/>
                        </Form.Group>
                        <Form.Group controlId="formGroupUsername">
                            <Form.Label>{translate("username")}</Form.Label>
                            <Form.Control name="username" type="text" maxLength="26" value={this.state.username} onChange={this.handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>{translate("Password")}</Form.Label>
                            <Form.Control name= "password" value={this.state.password} onChange={this.handleChange} type="password" autoComplete="on" required/>
                        </Form.Group>
                        <Row>
                            <Col sm={3} className="my-1">
                                <Button type="submit">{translate("signup")}</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </I18nProvider>
        );
    }
}

export default withRouter(Signup);
