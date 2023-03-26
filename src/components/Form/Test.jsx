import React from 'react';

import classes from './Test.module.css';

const Test = (props) => {
  return (
    <li className={classes.testCase}>
        <h2>Test status: <span className={classes.status}>{props.status}</span></h2>
        <h3>{props.browserName}</h3>
        <p>{props.browserVersion}</p>
        <p>{props.platformName}</p>
        <p>{props.public}</p>
    </li>
  )
};

export default Test;