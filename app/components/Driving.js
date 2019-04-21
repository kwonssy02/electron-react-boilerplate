// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import Gauge from 'react-canvas-gauge';

import styles from './Driving.css';
import carTailImg from '../../resources/images/car_tail.png';
import carUpsideImg from '../../resources/images/car_upside.png';
import properties from '../constants/properties';
import { TimelineMax } from "gsap/TweenMax";

const fs = window.require('fs');
type Props = {};

export default class Driving extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      mileage: undefined,
      speed: 0
    };
  }

  componentDidMount(): void {
    setInterval(() => {
      fs.readFile(
        properties.mileageFilePath,
        'utf-8',
        (err, data) => {
          if(err) {
            this.setState({
              mileage: undefined
            })
          }else {
            this.setState({
              mileage: data.trim()
            });
          }
        }
      );
      const speed = this.state.speed;
      this.setState({
        speed:speed+5
      });
    }, 1000);

    this.turnOn();
  }

  turnOn = () => {
    const SELECTOR_SCREEN_ELEMENT = '.' + styles.container;
    const timeline = new TimelineMax({
      paused: true
    });

    timeline
      .to(SELECTOR_SCREEN_ELEMENT, 2, {
        opacity:"1"
      });

    timeline.restart();
  }

  render() {
    const { mileage, speed } = this.state;
    return (
      <div className={styles.container} data-tid="container" style={{opacity:0}}>
        <h2 style={{position:"absolute", top:"5%", width:"100%", fontSize:"4rem"}}>HYUNDAI</h2>

        <h2 style={{position:"absolute", top:"40%", width:"100%", fontSize:"2rem", fontWeight:"lighter"}}>Mileage</h2>
        <h2 style={{position:"absolute", top:"45%", width:"100%", fontSize:"2.5rem"}}>{mileage === undefined ? null : `${mileage} km`}</h2>


        <img
          src={carUpsideImg}
          style={{
            position:"absolute",
            left:"7%",
            top:"15%",
            backgroundImage:"-webkit-gradient(linear, right top, left top, from(rgba(255, 255, 255, 0.2)),to(rgba(255, 255, 255, 0)))",
            borderRadius:"50%"
          }}
          height={400}
        />

        <Gauge
          size={300}
          theme={"dark"}
          value={speed}
          style={{
            position:"absolute",
            right:"6%",
            top:"26%"
          }}
        />

        <img
          src={carTailImg}
          style={{
            position:"absolute",
            bottom:"5%",
            left:"39%"
          }}
          height={200}
        />


        <h3
          style={{
            position:"absolute",
            left:"10%",
            bottom:"5%",
            border:"2px solid white",
            borderRadius:"15px",
            padding:"5px"
          }}>
          98%
        </h3>
        <h3
          style={{
            position:"absolute",
            left:"15%",
            bottom:"5%",
            border:"2px solid white",
            borderRadius:"15px",
            padding:"5px"
          }}>
          52&deg;C
        </h3>
        <h3
          style={{
            position:"absolute",
            right:"15%",
            bottom:"5%",
            border:"2px solid white",
            borderRadius:"15px",
            padding:"5px"
          }}>
          Sun Feb 28
        </h3>
        <h3
          style={{
            position:"absolute",
            right:"7%",
            bottom:"5%",
            border:"2px solid white",
            borderRadius:"15px",
            padding:"5px"
          }}>
          20:05 PM
        </h3>
      </div>
    );
  }
}
