import React from 'react';
import '../App.css';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Circle } from 'rc-progress';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

import * as firebase from 'firebase'
import config from '../config'

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showResult: false,
            percentage: 0,
            loading: true,
        };

        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }

    componentWillMount() {
        const ref = firebase.database().ref('fr')
        console.log("coucouuu")
        ref.on('value', snapshot => {
            this.setState({
                post: snapshot.val()[0],
                loading: false,
                percentage: snapshot.val()[0].up / (snapshot.val()[0].up + snapshot.val()[0].down) * 100,
            })
        })
    }

    handleClick(type) {
        this.setState({loading: true})
        switch(type) {
            case 'up':
                this.setState({
                    showResult: !this.state.showResult,
                    loading: false,
                })
                break;
            case 'down':
                this.setState({
                    showResult: !this.state.showResult,
                    loading: false,
                })
                break;
            case 'next':
                const ref = firebase.database().ref('fr')
                ref.on('value', snapshot => {
                    this.setState({
                        showResult: !this.state.showResult,
                        post: snapshot.val()[1],
                        percentage: snapshot.val()[1].up / (snapshot.val()[1].up + snapshot.val()[1].down) * 100,
                        loading: false,
                    })
                })
                break;
            default:
                this.setState({
                    loading: false,
                })
                break;
        }
    }

    render(){
        if (this.state.loading){
            return (
                <div> chargement en cours </div>
            )
        }
        return (
            <I18nProvider locale={this.locale}>
                <Container className="mt-5">
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h2 className="text-info">{translate("relatable?")}</h2>
                        </Col>
                    </Row>
                    {!this.state.showResult ? (
                        <div>
                            <Card className="mt-5">
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <p className="text-center">
                                            {this.state.post.text}
                                        </p>
                                        <footer className="blockquote-footer">
                                            <cite title="Source Title">{this.state.post.username}</cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                            <Row className="justify-content-md-center mt-5">
                                <Col md="auto">
                                    <Button size="lg" variant="info" className="mr-5" onClick={() => this.handleClick('up')}>{translate("so_relatable")}</Button>{' '}
                                    <Button size="lg" variant="danger" onClick={() => this.handleClick('down')}>{translate("not_relatable")}</Button>{' '}
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div className="justify-content-md-center mt-5 w-25 m-auto">
                            <Circle percent={this.state.percentage} strokeWidth="4" strokeColor="#66ccff" /> 
                            <small className="text-success">{translate('percentage', {'percentage': this.state.percentage, 'number': this.state.post.up})}</small>
                            <Row className="justify-content-md-center mt-5">
                                <Col md="auto">
                                    <Button size="lg" variant="info" onClick={() => this.handleClick('next')}>{translate("next")}</Button>{' '}
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </I18nProvider>
        );
    }
}

export default Browse;
