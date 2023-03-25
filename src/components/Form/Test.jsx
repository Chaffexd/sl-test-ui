import React from 'react';

const Test = (props) => {
  return (
    <li>
        <h2>{props.status}</h2>
        <h3>{props.date}</h3>
        <p>{props.info}</p>
    </li>
  )
};

export default Test;