// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import Gauge from 'react-canvas-gauge';

import styles from './Driving.css';
import carTailImg from '../../resources/images/car_tail.png';
import carUpsideImg from '../../resources/images/car_upside.png';

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
        '/Users/khc/workspace/electron-react-boilerplate/resources/mileage.info',
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
      this.setState({
        speed:this.state.speed+3
      })
    }, 1000);
  }

  render() {
    const { mileage, speed } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        <h2 style={{position:"absolute", top:"5%", width:"100%", fontSize:"4rem"}}>HYUNDAI</h2>

        <h2 style={{position:"absolute", top:"40%", width:"100%", fontSize:"2rem", fontWeight:"lighter"}}>Mileage</h2>
        <h2 style={{position:"absolute", top:"45%", width:"100%", fontSize:"2.5rem"}}>{mileage === undefined ? null : `${mileage} km`}</h2>


        <img
          src={carUpsideImg}
          alt={"car_upside"}
          style={{
            position:"absolute",
            left:"7%",
            top:"18%",
            backgroundImage:"-webkit-gradient(linear, right top, left top, from(rgba(255, 255, 255, 0.2)),to(rgba(255, 255, 255, 0)))",
            borderRadius:"50%"
          }}
          height={500}
        />

        <Gauge
          size={400}
          theme={"dark"}
          enableColorful={true}
          value={speed}
          style={{
            position:"absolute",
            right:"5%",
            top:"24%"
          }}
        />

        <img
          src={carTailImg}
          alt={"car_upside"}
          style={{
            position:"absolute",
            bottom:"5%",
            left:"38%"
          }}
          height={250}
        />


        <h3
          style={{
            position:"absolute",
            left:"7%",
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
            right:"5%",
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
