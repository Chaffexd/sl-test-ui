import React from 'react';
import Test from './Test';

const TestList = (props) => {
  return (
    <ul>
        {props.tests.map((test) => (
            <Test 
                key={test.id}
                status={test.status}
                date={test.date}
                info={test.info}
            />
        ))}
    </ul>
  );
};

export default TestList;