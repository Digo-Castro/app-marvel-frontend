import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MarvelContext from '../context/MarvelContext';
import APIGeneralRequests from '../services/APIGeneralRequests';
import EMAIL_REGEX from '../services/consts';
import '../css/pageForms.css';

const Login = () => {
  const { setName, setEmail } = useContext(MarvelContext);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const requestAPI = async (name, email) => {
    const request = await APIGeneralRequests(name, email, 'login');
    const token = await request.token;
    const status = await request.registred;
    if (token !== null) {
      localStorage.setItem(`${email}`, `${token}`);
      setName(name);
      setEmail(email);
      return setRedirect(true);
    }

    if (status === null) {
      setError('Incorrect name or email');
      return setShowError(true);
    }

    if (status === false) {
      setError('User not found');
      return setShowError(true);
    }
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
          <span>Login</span>
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
              placeholder="tony@avangers.com"
              onChange={handleChange}
              required
            />
          </label>
          {showError && <p className="error">{error}</p>}
          <div className="btn-container">
            <button
              type="button"
              className="btn-success"
              onClick={handleClick}
              disabled={!(nameValid && emailValid)}
            >
              Login
            </button>
          </div>
        </form>
        <div className="redirect-container">
          <span>First time here?</span>
          <Link to="/register" className="link">Register!</Link>
        </div>
        {redirect && <Redirect to="/" />}
      </div>
    </main>
  );
};

export default Login;
