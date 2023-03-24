import React from 'react';
import useInput from '../../hooks/use-input';

import classes from './Form.module.css';

const Form = (props) => {
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

  const formSubmissionHandler = (e) => {
    e.preventDefault();

    console.log(enteredUserName);
    console.log(enteredKey);

    if(!userNameValid && !accessKeyValid) {
      return;
    }

    resetUserName();
    resetAccessKey();
  };

  const userNameInputClasses = userNameError ? `${classes.username} ${classes.invalid}` : `${classes.username}`;
  const accessKeyInputClasses = userNameError ? `${classes.username} ${classes.invalid}` : `${classes.username}`;

  return (
    <div className={classes.inputContainer}>
        <form onSubmit={formSubmissionHandler}>
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
                type="text"
                id="key"
                value={enteredKey}
                onChange={keyChangedHandler}
                onBlur={accessKeyBlur}
            />
            {accessKeyError && <p className={classes.errorText}>Access key must be valid</p>}
          </div>
          <button disabled={!isFormValid} className={classes.button}>Fetch</button>
        </form>
    </div>
  );
};

export default Form;