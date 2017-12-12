import React, { Component } from 'react';
import { render } from 'react-dom';

import { AnalogClock, DigitalClock } from '../../src';
import 'typeface-orbitron';
import './index.css';

const Demo = () => {
  return (
    <div>
      <h1>react-clocks demo</h1>
      <AnalogClock />
      <DigitalClock />
    </div>
  );
};

render(<Demo />, document.querySelector('#demo'));
