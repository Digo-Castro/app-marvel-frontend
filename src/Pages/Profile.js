import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MarvelContext from '../context/MarvelContext';
import APIEditRequest from '../services/APIEditRequest';
import APIGet from '../services/APIGet';
import EMAIL_REGEX from '../services/consts';
import '../css/pageForms.css';

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
    let NEWName = '';
    let NEWEmail = '';

    if (!nameValid && editName) return setEditName(false);
    if (!emailValid && editEmail) return setEditEmail(false);
    if (editName) {
      NEWName = document.querySelector('#name').value;
    }
    if (editEmail) {
      NEWEmail = document.querySelector('#email').value;
    }
    await APIEditRequest(OLDEmail, NEWName, NEWEmail);
    if (nameValid) setName(NEWName);
    if (emailValid) setEmail(NEWEmail);
    setEditName(false);
    setEditEmail(false);
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
      <main className="profile-main">
        {redirect && <Redirect to="/login" />}
        <div className="form-container form-profile">
          <div className="form-title profile-title">
            <span>Profile</span>
          </div>
          <div className="profile-input-container">
            {editName ? (
              <form className="form">
                <label htmlFor="name" className="profile-label">
                  Nome:
                  <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength="20"
                    placeholder={name}
                    onChange={handleChange}
                    required
                    className="profile-input"
                  />
                </label>
                <button type="button" onClick={editUser} className="profile-btn">{nameValid ? 'Submit' : 'Cancel'}</button>
              </form>
            ) : (
              <>
                <p className="profile-p-label">Name: </p>
                <p className="profile-p-content">{name}</p>
                <button type="button" onClick={() => setEditName(true)} className="profile-btn">Edit</button>
              </>
            )}
          </div>
          <div className="profile-input-container">
            {editEmail ? (
              <form className="form">
                <label htmlFor="email" className="profile-label">
                  E-mail:
                  <input
                    type="email"
                    name="email"
                    id="email"
                    maxLength="40"
                    placeholder={email}
                    onChange={handleChange}
                    required
                    className="profile-input"
                  />
                </label>
                <button type="button" onClick={editUser} className="profile-btn">{emailValid ? 'Submit' : 'Cancel'}</button>
              </form>
            ) : (
              <>
                <p className="profile-p-label">Email: </p>
                <p className="profile-p-content">{email}</p>
                <button type="button" onClick={() => setEditEmail(true)} className="profile-btn">Edit</button>
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
