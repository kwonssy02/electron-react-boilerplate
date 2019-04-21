// @flow
import React, { Component } from 'react';
import { TimelineMax } from 'gsap/TweenMax';
import styles from './IgnOn.css';

type Props = {};

export default class IgnOn extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      welcomeMessage: 'Hello'
    }
  }

  componentDidMount(): void {
    this.turnOn();
    setTimeout(() => this.appendWelcomeMessage(','), 500);
    setTimeout(() => this.appendWelcomeMessage(' '), 800);
    setTimeout(() => this.appendWelcomeMessage('u'), 1000);
    setTimeout(() => this.appendWelcomeMessage('s'), 1300);
    setTimeout(() => this.appendWelcomeMessage('e'), 1400);
    setTimeout(() => this.appendWelcomeMessage('r'), 1500);
  }

  turnOn = () => {
    const SELECTOR_SCREEN_ELEMENT = '.' + styles.container;
    const timeline = new TimelineMax({
      paused: true
    });

    timeline
      .to(SELECTOR_SCREEN_ELEMENT, 3, {
        opacity:"1"
      });

    timeline.restart();
  }

  appendWelcomeMessage = (msg) => {
    const {welcomeMessage} = this.state;
    this.setState({
      welcomeMessage: welcomeMessage + msg
    });
  }



  render() {
    const {welcomeMessage} = this.state;
    return (
      <div className={styles.container} data-tid="container" style={{opacity:0}}>
        <h2 style={{position:"absolute", top:"40%", width:"100%"}}>{welcomeMessage}</h2>
      </div>
    );
  }
}
