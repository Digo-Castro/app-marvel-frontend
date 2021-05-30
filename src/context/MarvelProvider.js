import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MarvelContext from './MarvelContext';
import APIFavorite from '../services/APIFavorite';

function MarvelProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [collection, setCollection] = useState('comics');
  const [curToken, setCurToken] = useState('');
  const [cardsList, setCardsList] = useState([]);
  const [favorites, setFavorites] = useState({
    comics: [],
    characters: [],
  });

  const favoritesUpdate = async () => {
    console.log('chamou');
    const update = await APIFavorite(email, favorites);
    console.log(update);
    return 1;
  };

  return (
    <MarvelContext.Provider value={
      {
        name,
        setName,
        email,
        setEmail,
        favorites,
        setFavorites,
        collection,
        setCollection,
        curToken,
        setCurToken,
        cardsList,
        setCardsList,
        favoritesUpdate,
      }
  }
    >
      {children}
    </MarvelContext.Provider>
  );
}

export default MarvelProvider;

MarvelProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
