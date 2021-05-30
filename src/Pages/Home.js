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
    favoritesUpdate,
  } = useContext(MarvelContext);
  const [redirect, setRedirect] = useState(false);

  const authorization = async (token) => {
    const verifyToken = await APIGet(token);
    if (verifyToken.status === 500) return setRedirect(true);
    const { data } = verifyToken;
    console.log(data.favorites);
    if (!name || !email || data.name !== name || data.email !== email) return setRedirect(true);
    setCurToken(token);
    console.log(favorites.comics.length);
    if (favorites.comics.length > 1 || favorites.comics.length > 1) {
      await setFavorites(favorites);
      return favoritesUpdate();
    }
    if (favorites.comics.length < 2 && favorites.comics.length < 2) {
      await setFavorites(data.favorites);
      return favoritesUpdate();
    }
  };

  const getStorageToken = () => {
    const storageToken = localStorage.getItem(email);
    authorization(storageToken);
  };

  useEffect(() => getStorageToken(), []);

  return (
    <main>
      {/* {redirect && <Redirect to="/login" />} */}
      <Header />
      <Hero />
      <SearchBar />
      <Galery />
      <Footer />
    </main>
  );
};

export default Home;
