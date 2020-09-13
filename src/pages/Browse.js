import React from 'react';
import '../App.css';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Line } from 'rc-progress';

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
        this.currentKey='';
    }

    componentWillMount() {
        const ref = firebase.database().ref('fr')
        this.findPost(ref)
    }

    findPost(ref){
        const CHANCE_UP = 70
        const CHANCE_TIMESTAMP = 30
        // computing the percentage of change for each type of post
        const random = Math.floor(Math.random() * ( 100 + 1));
        if (random < CHANCE_UP) {
            this.findByKey(ref, 'up')
        }
        else if (random >=  CHANCE_UP && random <= CHANCE_UP + CHANCE_TIMESTAMP) {
            this.findByKey(ref, 'timestamp')
        }


    }

    findByKey(ref, key) {
        const refChild = ref.orderByChild(key)
        let post = undefined;
        refChild.once('value', snapshot => {
            const count =  snapshot.numChildren()
            const randomPost = Math.floor(Math.random() * (count/2 + 1)) + 1;
            const refChildLimit = refChild.limitToLast(randomPost)
            refChildLimit.once('value', snapshotup => {
                snapshotup.forEach(snap => {
                    let data = snap.val();
                    if (!this.keys.includes(snap.key) && !post){
                        this.keys.push(snap.key)
                        this.currentKey = snap.key
                        post = data;
                    }
                })
                if (!post) {
                    this.keys = [];
                    this.findByKey(ref, key)
                }
                else {
                    this.setState({
                        post: post,
                        loading: false,
                    })
                }
            })
        })
    
    }


    handleClick(type) {
        this.setState({loading: true})
        const ref = firebase.database().ref('fr')
        const postRef =  firebase.database().ref('fr/' + this.currentKey)
        let updates = {}
        switch(type) {
            case 'up':
                postRef.once('value', snapshot => {
                    updates['fr/' + this.currentKey + '/up'] = snapshot.val().up + 1
                    firebase.database().ref().update(updates)
                })
                this.updatePercentage(this.state.post.up + 1, this.state.post.down)
                break;
            case 'down':
                postRef.once('value', snapshot => {
                    updates['fr/' + this.currentKey + '/down'] = snapshot.val().down + 1
                    firebase.database().ref().update(updates)
                })
                this.updatePercentage(this.state.post.up, this.state.post.down + 1)
                break;
            case 'next':
                this.setState({
                    percentage: 0,
                })
                this.findPost(ref)
                break;
            default:
                this.setState({
                    loading: false,
                })
                break;
        }

        this.setState({ showResult: !this.state.showResult, loading: false })
    }

    updatePercentage(up, down){
        let percentage = up + down
        if (percentage) {
            percentage = Math.round(up / (up + down) * 100)
        }
        this.setState({
            showResult: !this.state.showResult,
            percentage: percentage,
            up: up,
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
                            <div className="justify-content-md-center mt-5 w-25 m-auto">
                                <Line percent={this.state.percentage} strokeWidth="4" strokeColor="#17a2b8" /> 
                            </div>
            {!this.state.showResult ? (
                            <Row className="justify-content-md-center mt-5">
                                <Col md="auto">
                                    <Button size="lg" variant="info" className="mr-5" onClick={() => this.handleClick('up')}>{translate("so_relatable")}</Button>{' '}
                                    <Button size="lg" variant="danger" onClick={() => this.handleClick('down')}>{translate("not_relatable")}</Button>{' '}
                                </Col>
                            </Row>
                    ) : (
                            <div> 
                                <Row className="justify-content-md-center mt-1">
                                    <Col md="auto">
                                        <small className="text-success justify-content-md-center">{translate('percentage', {'percentage': this.state.percentage, 'number': this.state.up})}</small>
                                    </Col>
                                </Row>
                                <Row className="justify-content-md-center mt-3">
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
