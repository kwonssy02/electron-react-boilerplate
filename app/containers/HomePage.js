// @flow
import React, { Component, Fragment } from 'react';
import Driving from '../components/Driving';
import Recovering from '../components/Recovering';
const fs = window.require('fs');

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      status: undefined
    };
  }

  componentDidMount(): void {
    setInterval(() => {
      fs.readFile(
        '/Users/khc/workspace/electron-react-boilerplate/resources/status.info',
        'utf-8',
        (err, data) => {
          if(err) {
            this.setState({
              status: undefined
            })
          }else {
            this.setState({
              status: data.trim()
            });
          }
        }
      );
    }, 1000);
  }

  render() {
    const { status } = this.state;
    return (
      <Fragment>
        {status === "driving" ? <Driving/> :
          status === "recovering" ? <Recovering/> :
            null}
      </Fragment>
    );
  }
}
