import React from 'react';
import Clock from './Clock';

export default function DigitalClock({ displayFormat, ...props }) {
  return (
    <Clock>
      {({ hours, minutes, seconds }) => {
        let hr, label;

        switch (displayFormat) {
          case '12-hour':
            hr = hours % 12 || 12;
            label = hours >= 12 ? 'PM' : 'AM';
            break;
          default:
            hr = hours;
            label = '';
            break;
        }

        return (
          <div {...props}>
            {hr}:{minutes}:{seconds} {label}
          </div>
        );
      }}
    </Clock>
  );
}

DigitalClock.defaultProps = {
  displayFormat: '12-hour'
};
