import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MarvelContext from '../context/MarvelContext';
import APIEditRequest from '../services/APIEditRequest';
import APIGet from '../services/APIGet';
import EMAIL_REGEX from '../services/consts';

const Profile = () => {
  const {
    name, email, setName, setEmail,
  } = useContext(MarvelContext);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const editUser = async () => {
    const OLDEmail = email;
    if (!nameValid && editName) return setEditName(false);
    if (!emailValid && editEmail) return setEditEmail(false);
    const NEWName = document.querySelector('#name').value;
    const NEWEmail = document.querySelector('#email').value;
    await APIEditRequest(OLDEmail, NEWName, NEWEmail);
    if (nameValid) setName(NEWName);
    if (emailValid) setEmail(NEWEmail);
    return 1;
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

  const authorization = async (token) => {
    const verifyToken = await APIGet(token);
    if (verifyToken.status === 500) return setRedirect(true);
    const { data } = verifyToken;

    if (!name || !email || data.name !== name || data.email !== email) return setRedirect(true);
  };

  const getStorageToken = () => {
    const storageToken = localStorage.getItem(email);
    authorization(storageToken);
  };

  useEffect(() => getStorageToken(), []);

  return (
    <>
      <Header />
      {redirect && <Redirect to="/login" />}
      <main>
        <div className="form-container">
          <div className="form-title">
            <span>Profile</span>
          </div>
          <div className="input-container">
            {editName ? (
              <form className="form">
                <label htmlFor="name">
                  Nome:
                  <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength="20"
                    placeholder={name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="button" onClick={editUser} className="btn">{nameValid ? 'Submit' : 'Cancel'}</button>
              </form>
            ) : (
              <>
                <p>Name: </p>
                <p>{name}</p>
                <button type="button" onClick={() => setEditName(true)} className="btn">Edit</button>
              </>
            )}
          </div>
          <div className="input-container">
            {editEmail ? (
              <form className="form">
                <label htmlFor="email">
                  E-mail:
                  <input
                    type="email"
                    name="email"
                    id="email"
                    maxLength="40"
                    placeholder={email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="button" onClick={editUser} className="btn">{emailValid ? 'Submit' : 'Cancel'}</button>
              </form>
            ) : (
              <>
                <p>Email: </p>
                <p>{email}</p>
                <button type="button" onClick={() => setEditEmail(true)} className="btn">Edit</button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
