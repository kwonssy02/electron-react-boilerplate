// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

const fs = window.require('fs');
type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      mileage: undefined
    };
  }

  componentDidMount(): void {
    setInterval(() => {
      fs.readFile(
        '/Users/khc/workspace/electron-react-boilerplate/resources/mileage',
        'utf-8',
        (err, data) => {
          this.setState({
            mileage: data
          });
        }
      );
    }, 1000);
  }

  render() {
    const { mileage } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        <h2>Mileage: {mileage}</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>
    );
  }
}
