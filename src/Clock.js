import React, { Component } from 'react';
import leftPad from 'left-pad';

const pad = i => leftPad(i, 2, '0');

export default class Clock extends Component {
  static defaultProps = {
    children: () => {}
  };

  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(this.getTime());
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getTime() {
    let date = new Date();
    let hours = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let seconds = pad(date.getSeconds());

    return { hours, minutes, seconds };
  }

  render() {
    return this.props.children(this.state);
  }
}
