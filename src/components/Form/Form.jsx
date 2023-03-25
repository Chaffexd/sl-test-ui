import React, { useState } from 'react';
import useInput from '../../hooks/use-input';

import show from '../../assets/shown.png';
import hidden from '../../assets/hidden.png';
import TestList from './TestList';

import classes from './Form.module.css';

const Form = (props) => {
  const [tests, setTests] = useState([]);
  const [shown, setShown] = useState(false);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState("eu");

  const showKeyHandler = () => {
    setShown(!shown);
  };

  const {
    value: enteredUserName,
    hasError: userNameError,
    isValid: userNameValid,
    valueChangedHandler: userNameChangedHandler,
    inputBlurHandler: userNameBlur,
    resetInput: resetUserName
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredKey,
    hasError: accessKeyError,
    isValid: accessKeyValid,
    valueChangedHandler: keyChangedHandler,
    inputBlurHandler: accessKeyBlur,
    resetInput: resetAccessKey
  } = useInput((value) => value.length === 36 && value.includes("-"));

  let isFormValid = false;

  if(userNameValid && accessKeyValid) {
    isFormValid = true;
  }

  const formSubmissionHandler = async(e) => {
    e.preventDefault();
    setError(null);

    console.log(enteredUserName);
    console.log(enteredKey);

    if(!userNameValid && !accessKeyValid) {
      return;
    };

    if(region === 'eu') {
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.eu-central-1.saucelabs.com/rest/v1/${enteredUserName}/jobs`, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(`${enteredUserName}:${enteredKey}`)
          },
          
        });
        if(!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        console.log(data);

        const tests = [];

        for(const key in data) {
          tests.push({
            id: key,
            status: data[key].status,
            text: data[key].base_config.browserName,
            info: data[key].base_config.browserVersion,
            version: data[key].base_config.platformName
          });
        };

        setTests(tests);

      } catch(error) {
        setError(error.message)
      };
    } else {
      try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.us-west-1.saucelabs.com/rest/v1/${enteredUserName}/jobs`, {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(`${enteredUserName}:${enteredKey}`)
          },
          
        });
        if(!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        console.log(data);
      } catch(error) {
        setError(error.message)
      };
    }

    resetUserName();
    resetAccessKey();
  };

  const userNameInputClasses = userNameError ? `${classes.username} ${classes.invalid}` : `${classes.username}`;
  const accessKeyInputClasses = userNameError ? `${classes.username} ${classes.invalid}` : `${classes.username}`;

  let testList = <p>No tests found.</p>
  if(tests.length > 0) {
    testList = <TestList tests={tests} />
  }

  if(error) {
    testList = <p>{error}</p>
  }

  return (
    <div className={classes.inputContainer}>
        <form onSubmit={formSubmissionHandler} className={classes.form}>
          <div className={userNameInputClasses}>
            <label htmlFor="username">Sauce Labs Username</label>
            <input 
                type="text"
                id="username"
                value={enteredUserName}
                onChange={userNameChangedHandler}
                onBlur={userNameBlur}
            />
            {userNameError && <p className={classes.errorText}>Username must not be blank</p>}
          </div>
          <div className={accessKeyInputClasses}>
            <label htmlFor="key">Sauce Labs Access Key</label>
            <input 
                type= {shown ? "text" : "password" }
                id="key"
                value={enteredKey}
                onChange={keyChangedHandler}
                onBlur={accessKeyBlur}
            />
            <span onClick={showKeyHandler}>
              {<img src={ shown ? show : hidden } alt="show key" className={classes.shown}/> }
            </span>
            {accessKeyError && <p className={classes.errorText2}>Access key must be valid</p>}
          </div>
          <div className={classes.username}>
            <label htmlFor="region">Region</label>
            <select id="region" value={region} onChange={e => setRegion(e.target.value)} >
              <option value="eu">EU</option>
              <option value="us">US</option>
            </select>
          </div>
          <button disabled={!isFormValid} className={classes.button}>Fetch</button>
        </form>
        {testList}
    </div>
  );
};

export default Form;