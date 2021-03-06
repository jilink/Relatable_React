import React from 'react';
import '../App.css';
import Post from '../components/Post';

import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactLoading from 'react-loading';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

import firebase from 'firebase/app'
import 'firebase/database'; 
import config from '../config'

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showResult: false,
            percentage: 0,
            loading: true,
            textLoading: false,
        };

        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
        this.category = "general"
        this.path = this.locale + '/' + this.category
        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }

        this.keys=[];
        this.currentKey='';
    }

    componentDidMount() {
        const ref = firebase.database().ref(this.path)
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
                        const stored_keys = JSON.parse(localStorage.getItem("stored_keys"))
                        if (stored_keys && stored_keys.includes(this.currentKey)) {
                            this.updatePercentage(post.up, post.down)
                            this.setState({ showResult: true })
                        }
                        else {
                            this.setState({ showResult: false, })
                        }
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
                        textLoading: false,
                    })
                }
            })
        })
    
    }

    storeKey(){
        let stored_keys = JSON.parse(localStorage.getItem("stored_keys")) || []
        stored_keys.push(this.currentKey)
        localStorage.setItem("stored_keys", JSON.stringify(stored_keys));
    }


    handleClick(type) {
        this.setState({loading: true})
        const ref = firebase.database().ref(this.path)
        const postRef =  firebase.database().ref(this.path + '/' + this.currentKey)
        let updates = {}
        switch(type) {
            case 'up':
                postRef.once('value', snapshot => {
                    updates[this.path + '/' + this.currentKey + '/up'] = snapshot.val().up + 1
                    firebase.database().ref().update(updates)
                })
                this.updatePercentage(this.state.post.up + 1, this.state.post.down)
                this.storeKey()
                this.setState({ showResult: true })
                break;
            case 'down':
                postRef.once('value', snapshot => {
                    updates[this.path + '/' + this.currentKey + '/down'] = snapshot.val().down + 1
                    firebase.database().ref().update(updates)
                })
                this.updatePercentage(this.state.post.up, this.state.post.down + 1)
                this.storeKey()
                this.setState({ showResult: true })
                break;
            case 'next':
                this.setState({
                    percentage: 0,
                    textLoading: true,
                    showResult: false,
                })
                this.findPost(ref)
                break;
            default:
                this.setState({
                    loading: false,
                    showResult: true,
                })
                break;
        }

        this.setState({ loading: false })
    }

    updatePercentage(up, down){
        let percentage = up + down
        if (percentage) {
            percentage = Math.round(up / (up + down) * 100)
        }
        this.setState({
            percentage: percentage,
            up: up,
        })
    
    }

    render(){
        if (this.state.loading){
            return (
                <Container>
                    <Row className="justify-content-center">
                        <ReactLoading type="cylon" color="#61dafb" height={'80vh'} width={'80vh'} />
                    </Row>
                </Container>
            )
        }
        return (
            <I18nProvider locale={this.locale}>
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <h2 className="text-info">{translate("relatable?")}</h2>
                        </Col>
                        </Row>
                        <Post post={this.state.post} textLoading={this.state.textLoading} percentage={this.state.percentage} up={this.state.up} />

            {!this.state.showResult ? (
                            <Row className="justify-content-center mt-5">
                                <Col xs="auto">
                                    <Button variant="info" className="mr-5" onClick={() => this.handleClick('up')} disabled={this.state.textLoading}>{translate("so_relatable")}</Button>{' '}
                                    <Button variant="danger" onClick={() => this.handleClick('down')} disabled={this.state.textLoading}>{translate("not_relatable")}</Button>{' '}
                                </Col>
                            </Row>
                    ) : (
                            <div> 
                                <Row className="justify-content-center mt-3">
                                    <Col xs="auto">
                                        <Button variant="info" onClick={() => this.handleClick('next')}>{translate("next")}</Button>{' '}
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
