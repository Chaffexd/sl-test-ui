import React from 'react';
import Test from './Test';

const TestList = (props) => {
  return (
    <ul>
        {props.tests.map((test) => (
            <Test 
              key={test.id}
              status={test.status}
              browserName={test.browserName}
              browserVersion={test.browserVersion}
              platformName={test.platformName}
              public={test.public}
            />
        ))}
    </ul>
  );
};

export default TestList;