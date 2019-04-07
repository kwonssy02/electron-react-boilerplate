// @flow
import React, { Component } from 'react';

import styles from './Driving.css';

type Props = {};

export default class Recovering extends Component<Props> {
  props: Props;

  render() {

    return (
      <div className={styles.container} data-tid="container">
        <h2 style={{position:"absolute", top:"40%", width:"100%"}}>Recovering . . .</h2>
      </div>
    );
  }
}
