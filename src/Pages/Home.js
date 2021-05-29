import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Galery from '../components/Galery';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import MarvelContext from '../context/MarvelContext';
import APIGet from '../services/APIGet';

const Home = () => {
  const {
    email,
    name,
    favorites,
    setFavorites,
    setCurToken,
  } = useContext(MarvelContext);
  const [redirect, setRedirect] = useState(false);

  const authorization = async (token) => {
    const verifyToken = await APIGet(token);
    if (verifyToken.status === 500) return setRedirect(true);
    const { data } = verifyToken;
    if (!name || !email || data.name !== name || data.email !== email) return setRedirect(true);
    setCurToken(token);
    return setFavorites(data.favorites);
  };

  const getStorageToken = () => {
    const storageToken = localStorage.getItem(email);
    authorization(storageToken);
  };

  useEffect(() => getStorageToken(), []);

  return (
    <main>
      {/* {redirect ? <Redirect to="/login" /> : ''} */}
      <Header />
      <Hero />
      <SearchBar />
      <Galery />
      <Footer />
    </main>
  );
};

export default Home;
