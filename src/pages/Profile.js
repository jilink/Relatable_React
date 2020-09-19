import React from 'react';
import '../App.css';
import Post from '../components/Post';

import ReactLoading from 'react-loading';
import { Container, Row, Col } from 'react-bootstrap';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

import config from '../config'
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [],
            loading: true,
        };

        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
        this.category = "general"
        this.path = this.locale + '/' + this.category

        if (!firebase.apps.length) {
            firebase.initializeApp(config)
        }
    }

    componentDidMount(){
        this.authListener();
    }

    authListener(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user})
                this.userPosts(user.uid)
            }
            else {
                window.location.href = "/login";
            }
        })
    }

    snapshotToArray(snapshot) {
        let returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    }

    userPosts(uid) {
        const ref = firebase.database().ref(this.path)
        ref.orderByChild('id').equalTo(uid).on("value", function(snapshot) {
            this.setState({posts: this.snapshotToArray(snapshot), loading: false})
        }.bind(this));
    }

    render() {
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
                    <Row className="justify-content-center mb-5">
                        <Col xs="auto">
                            <h2 className="text-info">{translate("Profile")}</h2>
                        </Col>
                    </Row>
                {this.state.posts.length ?
                        <div>
                            {this.state.posts.map((post) => {
                                return <Post key={post.key} post={post} computePercentage={true} up={post.up} />
                            })}
                        </div>
                
                :
                    <Row className="justify-content-center mb-5">
                        <Col xs="auto">
                            <h4>
                            {translate("no posts")},
                            <a variant="secondary" href="/create"> {translate("create")}</a>
                            </h4>
                        </Col>
                    </Row>
                
                }
                </Container>
            </I18nProvider>
        );
    }
}

export default Profile;
