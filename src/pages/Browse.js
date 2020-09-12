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

        this.keys=[];
    }

    componentWillMount() {
        const ref = firebase.database().ref('fr')
        this.findPost(ref)
        ref.on('value', snapshot => {
            this.setState({
                post: snapshot.val()[1],
                loading: false,
                // division par 0 attention
                percentage: Math.round(snapshot.val()[1].up / (snapshot.val()[1].up + snapshot.val()[1].down) * 100),
            })
        })
    }

    findPost(ref){
        const CHANCE_UP = 70
        const CHANCE_TIMESTAMP = 30
        // computing the percentage of change for each type of post
        const random = Math.floor(Math.random() * ( 100 + 1));
        if (random < CHANCE_UP) {
            console.log("up")
            this.findByUp(ref, 'up')
        }
        else if (random >=  CHANCE_UP && random <= CHANCE_UP + CHANCE_TIMESTAMP) {
            console.log("STAMP")
            this.findByUp(ref, 'timestamp')
        }


    }

    findByUp(ref, key) {
        const refChild = ref.orderByChild(key)
        let post = undefined;
        refChild.on('value', snapshot => {
            const count =  snapshot.numChildren()
            const randomPost = Math.floor(Math.random() * (count/2 + 1)) + 1;
            refChild.limitToLast(randomPost).on('value', snapshotup => {
                snapshotup.forEach(snap => {
                    let data = snap.val();
                    if (!this.keys.includes(snap.key) && !post){
                        console.log("post", data.text)
                        this.keys.push(snap.key)
                        post = data;
                    }
                })
            })
        })
    
    }


    handleClick(type) {
        this.setState({loading: true})
        const ref = firebase.database().ref('fr')
        let key = '0'
        ref.on('value', snapshot => {
            key = Object.keys(snapshot.val())[0]
        })
        const postRef =  firebase.database().ref('fr/' + key)
        let updates = {}
        console.log(key)
        switch(type) {
            case 'up':
                postRef.on('value', snapshot => {
                    updates['fr/' + key + '/up'] = snapshot.val().up + 1
                })
                break;
            case 'down':
                postRef.on('value', snapshot => {
                    updates['fr/' + key + '/down'] = snapshot.val().down + 1
                })
                break;
            case 'next':
                ref.on('value', snapshot => {
                    this.setState({
                        post: snapshot.val()[1],
                    })
                })
                this.findPost(ref)
                break;
            default:
                this.setState({
                    loading: false,
                })
                break;
        }

        firebase.database().ref().update(updates)
        ref.on('value', snapshot => {
            this.setState({
                showResult: !this.state.showResult,
                loading: false,
                percentage: Math.round(snapshot.val()[1].up / (snapshot.val()[1].up + snapshot.val()[1].down) * 100),
            })
        })
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
