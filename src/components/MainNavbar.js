import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

import config from '../config'
import firebase from 'firebase/app'
import 'firebase/auth';

class MainNavbar extends React.Component {
    constructor(props){
        super(props);
        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
        this.logout = this.logout.bind(this)
        this.state = {
            user: {},
        }
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
            }
            else {
                this.setState({user : null})
            }
                
        })
    }

    logout(){
        firebase.auth().signOut();
        window.location.reload(false);
    }

    swapLanguage () {
        if (this.locale===LOCALES.FRENCH) {
            localStorage.setItem('locale', LOCALES.ENGLISH);
            window.location.reload(false);
        }
        else {
            localStorage.setItem('locale', LOCALES.FRENCH);
            window.location.reload(false);
        }
    }

    render(){
        return (
            <I18nProvider locale={this.locale}>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="/" className="logo">RELATABLE</Navbar.Brand>
                    {this.state.user ?
                    <Nav className="ml-auto">
                      <Nav.Link href="/profile">{this.state.user.displayName}</Nav.Link>
                      <Nav.Link onClick={this.logout}>{translate("logout")}</Nav.Link>
                      <Nav.Link className="text-secondary" href="/create">{translate("create")}</Nav.Link>
                      <Nav.Link href="/" onClick={this.swapLanguage} className="text-info">{translate("swaplang")}</Nav.Link>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                      <Nav.Link href="/login">{translate("login")}</Nav.Link>
                      <Nav.Link href="/signup">{translate("signup")}</Nav.Link>
                      <Nav.Link className="text-secondary" href="/create">{translate("create")}</Nav.Link>
                      <Nav.Link href="/" onClick={this.swapLanguage} className="text-info">{translate("swaplang")}</Nav.Link>
                    </Nav>
                    }
                </Navbar>
            </I18nProvider>
        );
    }
}

export default MainNavbar;
