import React from 'react';
import { Component } from "react";

import './card.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      revealed: this.props.revealed,
    }
  }

  flipCard = (e) => {
    this.props.onCardFlipped(this.props.index+1,this.props.number);
  }

  render() {
    return (
      this.props.revealed ?
          <div className="card" onClick={e => this.flipCard(e)}>{this.props.number} </div> :
          <div className="card" style={{background: "rgb(228, 99, 7)", color: "rgb(228, 99, 7)"}} onClick={e => this.flipCard(e)}>{this.props.number}</div>
    )
  }

}

export default Card;
