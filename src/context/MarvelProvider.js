import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MarvelContext from './MarvelContext';

function MarvelProvider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <MarvelContext.Provider value={
      {
        name,
        setName,
        email,
        setEmail,
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
