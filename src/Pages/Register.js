import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import APIGeneralRequests from '../services/APIGeneralRequests';
import EMAIL_REGEX from '../services/consts';

const Register = () => {
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(false);

  const requestAPI = async (name, email) => {
    const request = await APIGeneralRequests(name, email, 'register');
    const status = await request.register;

    if (status === true) return setRedirect(true);
    if (status === false) return setShowError(true);
  };

  const handleClick = () => {
    if (nameValid && emailValid) {
      const newName = document.querySelector('#name').value;
      const newEmail = document.querySelector('#email').value;
      return requestAPI(newName, newEmail);
    }
  };

  const handleChange = (event) => {
    const inputId = event.target.id;
    const inputValue = event.target.value;

    if (inputId === 'name') {
      if (inputValue.length >= 3) {
        return setNameValid(true);
      }
      return setNameValid(false);
    }
    if (inputId === 'email') {
      if (EMAIL_REGEX.test(inputValue)) {
        return setEmailValid(true);
      }
      return setEmailValid(false);
    }
  };

  return (
    <main>
      <div className="form-container">
        <div className="form-title">
          <span className="register-title">Register</span>
        </div>
        <form className="form">
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              maxLength="20"
              placeholder="Tony Stark"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              name="email"
              id="email"
              maxLength="40"
              placeholder="tony@avengers.com"
              onChange={handleChange}
              required
            />
          </label>
          {showError && <p className="error">User already registred!</p>}
          <div className="btn-container">
            <button
              type="button"
              className="btn-success"
              onClick={handleClick}
              disabled={!(nameValid && emailValid)}
            >
              Register
            </button>
          </div>
        </form>
        <div className="redirect-container">
          <span>Registred?</span>
          <Link to="/login" className="link">Click here!</Link>
        </div>
        {redirect && <Redirect to="/login" />}
      </div>
    </main>
  );
};

export default Register;
