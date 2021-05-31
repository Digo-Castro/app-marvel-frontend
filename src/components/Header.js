import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MarvelContext from '../context/MarvelContext';
import logo from '../images/marvelLogo.svg';
import '../css/header.css';

const Header = () => {
  const { setCollection } = useContext(MarvelContext);
  const [redirect, setRedirect] = useState(false);
  const handleClick = (event) => {
    const { value } = event.target;
    setCollection(value);
    setRedirect(true);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Marvel" className="logo" />
      </div>
      <nav className="nav">
        <ul>
          <li>
            <button type="button" className="btn-header" id="comicsBtn" value="comics" onClick={handleClick}>Comics</button>
          </li>
          <li>
            <button type="button" className="btn-header" id="CharBtn" value="characters" onClick={handleClick}>Characters</button>
          </li>
          <li>
            <Link to="/favorites" className="btn-header" id="favoritesBtn">Favorites</Link>
          </li>
          <li>
            <Link to="/profile" className="btn-header" id="profileBtn">Profile</Link>
          </li>
          <li>
            <Link to="/login" className="btn-header" id="logoutBtn">Logout</Link>
          </li>
        </ul>
      </nav>
      {redirect && <Redirect to="/" />}
    </header>
  );
};

export default Header;
