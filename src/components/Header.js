import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MarvelContext from '../context/MarvelContext';
import logo from '../images/marvelLogo.svg';

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
            <button type="button" className="btn" id="comicsBtn" value="comics" onClick={handleClick}>Comics</button>
          </li>
          <li>
            <button type="button" className="btn" id="CharBtn" value="characters" onClick={handleClick}>Characters</button>
          </li>
          <li>
            <Link to="/favorites" className="btn" id="favoritesBtn">Favorites</Link>
          </li>
          <li>
            <Link to="/profile" className="btn" id="profileBtn">Profile</Link>
          </li>
          <li>
            <Link to="/login" className="btn" id="logoutBtn">Logout</Link>
          </li>
        </ul>
      </nav>
      {redirect && <Redirect to="/" />}
    </header>
  );
};

export default Header;
