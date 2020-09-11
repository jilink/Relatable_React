import React from 'react';
import '../App.css';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Circle } from 'rc-progress';

import { I18nProvider, LOCALES } from '../i18n';
import translate from '../i18n/translate';

class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showResult: false,
            percentage: 0,
        };

        this.locale = localStorage.getItem('locale') || LOCALES.ENGLISH;
    }

    handleClick(type) {
        this.setState({
            showResult: !this.state.showResult,
            percentage: 25,
        });
        console.log("hey", this.state.showResult)
    }

    render(){
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
                                            {' '}
                                            LLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.orem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.{' '}
                                        </p>
                                        <footer className="blockquote-footer">
                                            <cite title="Source Title">Anonymous</cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>
                            <Row className="justify-content-md-center mt-5">
                                <Col md="auto">
                                    <Button size="lg" variant="info" className="mr-5" onClick={() => this.handleClick('James')}>{translate("so_relatable")}</Button>{' '}
                                    <Button size="lg" variant="danger" onClick={() => this.handleClick('James')}>{translate("not_relatable")}</Button>{' '}
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div className="justify-content-md-center mt-5 w-25 m-auto">
                            <Circle percent={this.state.percentage} strokeWidth="4" strokeColor="#66ccff" /> 
                            <small className="text-success">{translate('percentage', {'percentage': 10, 'number': 21})}</small>
                            <Row className="justify-content-md-center mt-5">
                                <Col md="auto">
                                    <Button size="lg" variant="info" onClick={() => this.handleClick('James')}>{translate("next")}</Button>{' '}
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
