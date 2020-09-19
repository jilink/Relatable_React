import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../App.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Line } from 'rc-progress';
import ReactLoading from 'react-loading';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

class Post extends React.Component {
    constructor(props){
        super(props);
        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
    }

    render(){
        return (
            <I18nProvider locale={this.locale}>
                <Card className="mt-5">
                    {this.props.textLoading?
                    <ReactLoading className="align-self-center m-3" type="spin" color="#61dafb" />
                    :
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p className="text-center">
                                {this.props.post.text}
                            </p>
                            <footer className="blockquote-footer">
                                <cite title="Source Title">{this.props.post.username}</cite>
                            </footer>
                        </blockquote>
                    </Card.Body>
                    }
                </Card>
                <div className="justify-content-center mt-5 w-25 m-auto">
                    <Line percent={this.props.percentage} strokeWidth="4" strokeColor="#17a2b8" /> 
                </div>
                {this.props.percentage ?
                <Row className="justify-content-center mt-1">
                    <Col xs="auto">
                        <small className="text-primary justify-content-center">{translate('percentage', {'percentage': this.props.percentage, 'number': this.props.up})}</small>
                    </Col>
                </Row>
                : null}
            </I18nProvider>
        );
    }
}

export default Post;
