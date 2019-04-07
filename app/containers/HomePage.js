// @flow
import React, { Component, Fragment } from 'react';
import Driving from '../components/Driving';
import Recovering from '../components/Recovering';
import IgnOff from '../components/IgnOff';
import IgnOn from '../components/IgnOn';
import Uploading from '../components/Uploading';
import properties from '../constants/properties';

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
        properties.statusFilePath,
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
        {status === "driving" ? <Driving/> : null}
        {status === "recovering" ? <Recovering/> : null}
        {status === "ignOff" ? <IgnOff/> : null}
        {status === "ignOn" ? <IgnOn/> : null}
        {status === "uploading" ? <Uploading/> : null}
      </Fragment>
    );
  }
}
