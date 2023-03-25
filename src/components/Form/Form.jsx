import React, { useState } from 'react';
import useInput from '../../hooks/use-input';

import show from '../../assets/shown.png';
import hidden from '../../assets/hidden.png';

import classes from './Form.module.css';

const Form = (props) => {
  const [shown, setShown] = useState(false);
  const [error, setError] = useState(null);

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

    try {
      const response = await fetch(`https://api.eu-central-1.saucelabs.com/rest/v1/${enteredUserName}/jobs`, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `${enteredUserName}:${enteredKey}`
        })
      });
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
    } catch(error) {
      setError(error.message)
    };

    resetUserName();
    resetAccessKey();
  };

  const userNameInputClasses = userNameError ? `${classes.username} ${classes.invalid}` : `${classes.username}`;
  const accessKeyInputClasses = userNameError ? `${classes.username} ${classes.invalid}` : `${classes.username}`;

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
          <button disabled={!isFormValid} className={classes.button}>Fetch</button>
        </form>
    </div>
  );
};

export default Form;