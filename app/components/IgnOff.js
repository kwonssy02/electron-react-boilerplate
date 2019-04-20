// @flow
import React, { Component, Fragment } from 'react';
import {TimelineMax, Power2} from 'gsap/TweenMax';
import styles from './IgnOff.css';

type Props = {};

export default class IgnOff extends Component<Props> {
  componentDidMount(): void {
    setTimeout(this.turnOff, 3000);
  }

  turnOff = () => {
    const SELECTOR_SCREEN_ELEMENT = '.' + styles.screen;
    const timeline = new TimelineMax({
      paused: true
    });

    timeline
      .to(SELECTOR_SCREEN_ELEMENT, .3, {
        width: '100vw',
        height: '2px',
        // background: '#ffffff',
        ease: Power2.easeOut
      })
      .to(SELECTOR_SCREEN_ELEMENT, .3, {
        width: '0',
        height: '0',
        // background: '#ffffff'
      });


    timeline.restart();
  }

  render() {
    return (
      <Fragment>
        <section className={styles.screen}>
          <div className={styles.container} data-tid="container">
            <h2 style={{position:"absolute", top:"40%", width:"100%"}}>See ya</h2>
          </div>
        </section>
      </Fragment>
    );
  }
}
