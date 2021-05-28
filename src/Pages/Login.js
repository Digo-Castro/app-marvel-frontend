import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import APIGeneralRequests from '../services/APIGeneralRequests';
import EMAIL_REGEX from '../services/consts';

const Login = () => {
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const requestAPI = async (name, email) => {
    const request = await APIGeneralRequests(name, email, 'login');
    const token = await request.token;
    const status = await request.registred;
    console.log(token);
    console.log(status);
    if (token !== null) {
      localStorage.setItem(`${email}`, `${token}`);
      return setRedirect(true);
    };
    if (status === null) {
      setError('Nome ou e-mail incorretos');
      return setShowError(true);}
    if (status === false) {
      setError('Usuário não encontrado');
      return setShowError(true);}
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
  }

  return (
    <main>
      <div className="form-container">
        <div className="form-title">
          <span>Cadastra-se</span>
        </div>
        <form className="form">
          <label htmlFor="name">
            Nome:
            <input
            type="text"
            name="name"
            id="name"
            maxLength="20"
            placeholder="min 3 caracteres"
            onChange={ handleChange }
            required />
          </label>
          <label htmlFor="email">
            E-mail:
            <input
            type="email"
            name="email"
            id="email"
            maxLength="40"
            placeholder="seu email"
            onChange={ handleChange }
            required />
          </label>
          <div className="btn-container">
            <button
            type="button"
            className="btn success"
            onClick={ handleClick }
            disabled={ nameValid && emailValid ? false : true}
            >
              Login
            </button>
          </div>
        </form>
        <div className="redirect-conteiner">
          <span>Já é cadastrado?</span>
          <Link to="/login" className="link">Clique aqui!</Link>
        </div>
        {redirect ? <Redirect to='/' /> : ''}
        {showError ? <p>{error}</p> : ''}
      </div>
    </main>
  );
};

export default Login;