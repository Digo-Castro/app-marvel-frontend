import React, { useContext, useState } from 'react';
import MarvelContext from '../context/MarvelContext';
import getMarvelAPI from '../services/marvelAPI/getsMarvelAPI';

const SearchBar = () => {
  const { collection, setCardsList } = useContext(MarvelContext);
  const [showError, setShowError] = useState(false);

  const handleClick = async () => {
    setShowError(false);
    const inputText = document.querySelector('#searchInput').value;
    if (collection === 'comics') {
      const search = await getMarvelAPI('comicTitle', inputText);
      if (search.data.results.length < 1) return setShowError(true);
      return setCardsList(search.data.results);
    }
    const search = await getMarvelAPI('charName', inputText);
    if (search.data.results.length < 1) return setShowError(true);
    console.log(search);
    return setCardsList(search.data.results);
  };

  return (
    <section className="search-bar-container">
      <div className="search-box-container">
        <form className="search-form">
          <label htmlFor="searchInput">
            <input
              type="text"
              name="searchInput"
              id="searchInput"
              maxLength="40"
              className="search-input"
            />
          </label>
        </form>
        <button type="button" onClick={handleClick} className="btn">Search</button>
      </div>
      {showError ? <p className="message-error">Not found</p> : ''}
    </section>
  );
};

export default SearchBar;
