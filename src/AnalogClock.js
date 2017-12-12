import React from 'react';
import Clock from './Clock';

const toRadians = angle => angle * (Math.PI / 180);
const parse = n => parseInt(n, 10);

function gradient(angle) {
  let anglePI = toRadians(angle);
  return {
    x1: Math.round(50 + Math.sin(anglePI) * 50) + '%',
    y1: Math.round(50 + Math.cos(anglePI) * 50) + '%',
    x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%',
    y2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%'
  };
}

function calculate({ radius, hours, minutes, seconds }) {
  let diameter = radius * 2;
  let hoursAngle = 360 * ((parse(hours) % 12 || 12) / 12) - 90;
  let minutesAngle = 360 * (parse(minutes) / 60) - 90;
  let secondsAngle = 360 * (parse(seconds) / 60) - 90;

  let hoursRadians = toRadians(hoursAngle);
  let minutesRadians = toRadians(minutesAngle);
  let secondsRadians = toRadians(secondsAngle);

  let hoursX = radius * Math.cos(hoursRadians);
  let hoursY = radius * Math.sin(hoursRadians);
  let minutesX = radius * Math.cos(minutesRadians);
  let minutesY = radius * Math.sin(minutesRadians);
  let secondsX = radius * Math.cos(secondsRadians);
  let secondsY = radius * Math.sin(secondsRadians);

  return {
    diameter,
    hoursAngle,
    minutesAngle,
    secondsAngle,
    hoursRadians,
    minutesRadians,
    secondsRadians,
    hoursX,
    hoursY,
    minutesX,
    minutesY,
    secondsX,
    secondsY
  };
}

const ClockHand = ({ radius, height, angle, ...props }) => {
  return (
    <rect
      x={0}
      y={0}
      height={height}
      rx={height / 2}
      ry={height / 2}
      transform={`rotate(${angle})`}
      {...props}
    />
  );
};

export default function AnalogClock({ radius, ...props }) {
  return (
    <Clock>
      {({ hours, minutes, seconds }) => {
        let {
          diameter,
          hoursAngle,
          minutesAngle,
          secondsAngle,
          hoursRadians,
          minutesRadians,
          secondsRadians,
          hoursX,
          hoursY,
          minutesX,
          minutesY,
          secondsX,
          secondsY
        } = calculate({ radius, hours, minutes, seconds });

        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={diameter}
            height={diameter}
            viewBox={`${-radius} ${-radius} ${diameter} ${diameter}`}
          >
            <defs>
              <linearGradient id="clock-gradient" {...gradient(180)}>
                <stop offset="0%" stopColor="#111" />
                <stop offset="100%" stopColor="#333" />
              </linearGradient>

              <linearGradient id="hour-gradient" {...gradient(90)}>
                <stop offset="0%" stopColor="rgb(230, 12, 41)" />
                <stop offset="100%" stopColor="rgb(237, 0, 130)" />
              </linearGradient>
            </defs>
            <g>
              <circle fill="url(#clock-gradient)" cx="0" cy="0" r={radius} />
              <ClockHand
                width={0.6 * radius}
                radius={radius}
                fill="url(#hour-gradient)"
                angle={hoursAngle}
                height={4}
              />

              <ClockHand
                width={0.8 * radius}
                radius={radius}
                fill="#fff"
                angle={minutesAngle}
                height={2}
              />

              {/* <ClockHand
                width={0.9 * radius}
                radius={radius}
                fill="#f00"
                angle={secondsAngle}
                height={2}
              /> */}
            </g>
          </svg>
        );
      }}
    </Clock>
  );
}

AnalogClock.defaultProps = {
  radius: 100
};
