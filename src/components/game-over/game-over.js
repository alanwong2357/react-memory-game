import React from 'react';
import { Component } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

import './game-over.css';

class GameOver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.toggleGameOver = this.toggleGameOver.bind(this);
    this.newGame = this.newGame.bind(this);
  };

  toggleGameOver = () => {
    this.props.toggleGameOver();
  }

  newGame = (difficulty) => {
    this.props.handleNewGame(difficulty);
  }

  render() {
    console.log("IN GAME OVER",this.props.timeElapsed);
    console.log("init:",this.props.init,"gameOver:",this.props.gameOver);
    return (
      this.props.init ?
      <Modal className="game-over" show={true}>
          <Modal.Header>
            <Modal.Title>Welcome!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Click on one of the difficulties to start a game. </p>
            <li style={{listStyleType:"none"}}>Easy (36 Cards)</li>
            <li style={{listStyleType:"none"}}>Medium (64 Cards)</li>
            <li style={{listStyleType:"none"}}>Hard (100 Cards)</li>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={e=>{this.toggleGameOver(); this.newGame("easy")}}>Easy</Button>
            <Button variant="primary" onClick={e=>{this.toggleGameOver(); this.newGame("medium")}}>Medium</Button>
            <Button variant="primary" onClick={e=>{this.toggleGameOver(); this.newGame("hard")}}>Hard</Button>

          </Modal.Footer>
        </Modal>
        : this.props.gameOver ?
          <Modal className="game-over" show={true}>
            <Modal.Header>
              <Modal.Title>You won!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>It took you {parseFloat(this.props.timeElapsed).toFixed(2)} seconds to complete</p>
              <p>Play Again?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={e=>{this.toggleGameOver(); this.newGame("easy")}}>Easy</Button>
              <Button variant="primary" onClick={e=>{this.toggleGameOver(); this.newGame("medium")}}>Medium</Button>
              <Button variant="primary" onClick={e=>{this.toggleGameOver(); this.newGame("hard")}}>Hard</Button>

            </Modal.Footer>
          </Modal>
        : ""

    )
  }
}

export default GameOver;
