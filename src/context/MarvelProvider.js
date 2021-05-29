import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MarvelContext from './MarvelContext';

function MarvelProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [favorites, setFavorites] = useState({});
  const [collection, setCollection] = useState('comics');
  const [curToken, setCurToken] = useState('');
  const [cardsList, setCardsList] = useState([]);

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
