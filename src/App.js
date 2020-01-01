import React from 'react';
import { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Board from './components/board/board.js';import './App.css';

class App extends Component {
  constructor() {
    super();

    let tempTime = 0;

    this.state = {
      gameOver: false,
      init: true,
      start: tempTime,
      current: tempTime
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleReset(init,gameOver) {
    this.setState({
      init: init,
      gameOver: gameOver
    },

    console.log("gameOver:",this.state.gameOver));
  }

  handleGameOver() {
    this.setState({ gameOver: true });
  }

  handleClose() {
    this.setState({
      init: false,
      gameOver: true
    });
  }

  setStart = () => {
    let date = performance.now();
    this.setState({ start: date },console.log("start is",this.state.start));
  }

  setCurrent = () => {
    let date = performance.now();
    this.setState({
      current: date,
      timeElapsed: (parseFloat(date)-parseFloat(this.state.start))/1000.00
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Row>
            Memory Game
            <Col style={{position: "absolute", top: "0", left: "0", justifyContent: "center"}}>
              <Button variant="primary" className="reset" onClick={() => this.handleReset(true,false)}>
                Reset
              </Button>
            </Col>
          </Row>
        </header>
        <Board className="board"
          gameOver={this.state.gameOver}
          handleReset={this.handleReset}
          handleGameOver={this.handleGameOver}
          init={this.state.init}
          setStart={this.setStart}
          setCurrent={this.setCurrent}
          timeElapsed={this.state.timeElapsed}
        />
      </div>
    );
  }
}

export default App;
