import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import './storyboard.css';
import {FormattedMessage} from 'react-intl';

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

class Storyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentID: -1,
            title: "New Card",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            cards: []
        };
    }

    componentWillReceiveProps(nextProps) {
        fetch('/api/storyboards'+'/'+nextProps.theStoryID)
        .then(res => {
        return res.json()}).then(res => {
            this.setState({
                currentID:res.id,
                title:res.title,
                timestamp:res.timestamp,
                cards:nextProps.cardsIn
            })
        });
    }

    addCard = (e) => {
        e.preventDefault();
        const newID = getNewId(this.state.cards)
        const newCard = {
            id: newID,
            storyboardId: this.state.currentID,
            title:"New Card",
            imageURL: "https://www.nps.gov/articles/images/Image-w-cred-cap_-1200w-_-Brown-Bear-page_-brown-bear-in-fog_2_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            text: "Some awesome text for your card :)"
        }
        this.setState({
            cards: [...this.state.cards, newCard]
        })
        this.props.addCardBE(newCard)
    }

    onEdit = (index) => {
        this.props.getCardBE(index)
    }

    removeCard = (index) => {
        this.setState(({cards}) => {
          let mCards = [ ...cards ]
          mCards = mCards.filter(p => p.id != index)
          return { cards: mCards }
        })
        this.props.removeCardBE(index)
    }

    updateStoryboard = (e) => {
        e.preventDefault();
        let newTitle = this.inputTitle.value;
        const newStoryboard = {
            id: 1,
            timestamp: "Mon Aug 27 2018 15:16:17 GMT+0200 (CEST)",
            title: newTitle
        }
        if(this.state.currentID != -1 && this.state.currentID != undefined){
            this.props.updateStoryboardBE(this.state.currentID,newStoryboard)
        }
    }

    render() {
        const getCards = this.state.cards.map((c) => {
            return (
            <Card style={{ width: '18rem' }}>
                <Card.Img alt="card image" variant="top" src="https://static3planetadelibroscom.cdnstatics.com/usuaris/web_minisite/fotos/1/original/148__c_comic_mobile3.jpg" />
                <Card.Body>
                    <Card.Title>
                        { c.title }
                    </Card.Title>
                    <Card.Text>
                        { c.text }
                    </Card.Text>
                        <Button variant="primary" onClick={() => this.onEdit(c.id)}><FormattedMessage id="Edit"/></Button>
                    <Button variant="primary" onClick={() => this.removeCard(c.id)}><FormattedMessage id="Remove"/></Button>
                </Card.Body>
            </Card>);
        })
        if (this.props.show ) {
            return (
                <div className="Storyboard">
                    <Container>
                        <Row>
                            <h1 className="AxeH1"><FormattedMessage id="SbEditor" /></h1>
                        </Row>
                        <Row>
                            <Col className = "no-padding">
                                <input aria-label= "storyboard's title" type="text" defaultValue={this.state.title} ref={(ref) => this.inputTitle = ref}/>
                            </Col>
                            <Col className = "no-padding">
                                <Button variant="primary" onClick={(e) => this.updateStoryboard(e)}><FormattedMessage id="Guardar"/></Button>
                            </Col>
                            <Col>
                                <button type="button" class="close close-btn" aria-label="Close" onClick = {this.props.closeStoryboard}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            { getCards }
                            <Col>
                                <Button variant="primary" onClick={(e) => this.addCard(e)}><FormattedMessage id="Add"/></Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        } else {

            return (
                <div />
            );
        }
    }
}

export default Storyboard;