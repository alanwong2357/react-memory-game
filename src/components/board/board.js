import React from 'react';
import { Component } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
// import * as CardList from '../card/cardlist.js';

import Card from '../card/card.js';
import GameOver from '../game-over/game-over.js';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardlist: [],
      rows: 0,
      correctCards: [],
      selectedCards: [],
      select: true,

    }

    this.onGameOver = this.onGameOver.bind(this);
    this.setStart = this.props.setStart.bind(this);
    this.setCurrent = this.props.setCurrent.bind(this);
  }

  componentDidMount() {
    this.getCards("easy");

  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }


  getCards = (difficulty) => {
    let newCardlist;
    if(difficulty ==="easy") {
      newCardlist = ([...Array(18).keys()].map(i => ++i).concat([...Array(18).keys()].map(i => ++i))).sort(x => 0.5 - Math.random());
    } else if(difficulty ==="medium") {
      newCardlist = ([...Array(32).keys()].map(i => ++i).concat([...Array(32).keys()].map(i => ++i))).sort(x => 0.5 - Math.random());
    } else if(difficulty ==="hard") {
      newCardlist = ([...Array(50).keys()].map(i => ++i).concat([...Array(50).keys()].map(i => ++i))).sort(x => 0.5 - Math.random());
    }
      this.setState({
        cardlist: newCardlist,
        rows: Math.sqrt(newCardlist.length),
        tempSelectedCards: newCardlist
      });
      // console.log("cardlist is",newCardlist);

  }

  onCardFlipped = (index,number) => {
    let tempSelectedCards = this.state.selectedCards;

    if(!tempSelectedCards.some(e => e.index === {index: index,number: number}.index) && this.state.select) {
      tempSelectedCards.push({index: index,number: number});
      this.setState ({
        selectedCards: tempSelectedCards
      });
    } else {
      return;
    }
    if(tempSelectedCards.length===2) {          // if match
      if(Object.is(tempSelectedCards[0].number, number)) {
        let newCards = this.state.correctCards.concat(tempSelectedCards);
        this.setState({
            selectedCards: [],
            correctCards: newCards
          },
          this.onGameOver
        );
      } else {                                  //if there is no match
        this.setState({ select: false});
        setTimeout(() => {
          this.setState({
            selectedCards: [],
            select: true
          });
        }, 800);
      }
    } else {                                   //if no card has been slected before
      this.setState({
        selectedCards: tempSelectedCards
      });
    }
    console.log("Selected Cards:",this.state.selectedCards,"correctCards:",this.state.correctCards);

  }

  onGameOver = () => {
    console.log(this.state.correctCards.length,"==",this.state.cardlist.length);
    if(this.state.correctCards.length===this.state.cardlist.length) {
      this.props.setCurrent();
      this.props.handleGameOver();
    }
  }

  toggleGameOver = () => {
    this.props.handleGameOver();
  }

  handleNewGame = (difficulty) => {
    this.props.handleReset(false,false);
    this.setState({
      correctCards: [],
      selectedCards: [],
    },
      this.getCards(difficulty),
      this.props.setStart()
    );
  }

  render() {
    const rows = this.state.rows;
    let i = 1;
    let splitted = this.splitCards(this.state.cardlist,rows);

    return (
      <Container style={{ marginTop: "2vh"}}>
        <Container style={{ zIndex: "100"}}>
          {this.props.gameOver || this.props.init ?
            <GameOver
              gameOver={this.props.gameOver}
              toggleGameOver={this.toggleGameOver}
              handleNewGame={this.handleNewGame}
              init={this.props.init}
              timeElapsed={this.props.timeElapsed}
            />
            : ""}
        </Container>
        {splitted.map((rows,index) => (
          <Row className="justify-content-center" md = {{ span: 12 }} key={index}>
            {rows.map((cards,index) => {
              return (<Col key={index}>
                <Card
                  index = {i++}
                  number={cards}
                  revealed={this.state.selectedCards.some(e => e.index === {index: i,number: cards}.index) || this.state.correctCards.some(e => e.index === {index: i,number: cards}.index)}
                  onCardFlipped={this.onCardFlipped}/>
              </Col>);

            }
            )}
          </Row>
        ))}
      </Container>
    )
  }

  splitCards(arr, n) {
    let index = 0;
    let res = []
    while(index < arr.length) {
      let chunk = arr.slice(0,n);
      res.push(chunk);
      arr = arr.slice(n);
    }
    return res;
  }

  renderCards(cards,index){
    return (
      <td style={{padding: "1em"}} key={index}>{cards} </td>
    )
  }

}

export default Board;
