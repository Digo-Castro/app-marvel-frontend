import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MarvelContext from '../context/MarvelContext';
import APIGet from '../services/APIGet';
import '../css/favorites.css';

const Favorites = () => {
  const {
    name, email, favorites, setCollection,
  } = useContext(MarvelContext);
  const [redirect, setRedirect] = useState(false);
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
      {favorites.comics.length < 1 && favorites.characters.length < 1
        ? (
          <section className="no-favorites-message-container">
            <p className="no-favorites-message">There are no favorites defined.</p>
          </section>
        )
        : (
          <main>
            <section className="favorites-galery">
              <div className="favorites-cards-galery">
                <h2 className="favorites-galery-title">Comics</h2>
                <ul>
                  {favorites.comics.map((comic) => (
                    <li>
                      <Link
                        className="favorites-card"
                        onClick={() => setCollection('comics')}
                        to={`/card/${comic.id}`}
                      >
                        <img
                          src={`${comic.Thumbnail.path}/portrait_xlarge.${comic.Thumbnail.extension}`}
                          alt={comic.Title}
                          className="favorites-card-image"
                        />
                      </Link>
                      <h3>{comic.Title}</h3>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="favorites-cards-galery">
                <h2 className="favorites-galery-title">Characters</h2>
                <ul>
                  {favorites.characters.map((character) => (
                    <li>
                      <Link
                        className="favorites-card"
                        onClick={() => setCollection('characters')}
                        to={`/card/${character.id}`}
                      >
                        <img
                          src={`${character.Thumbnail.path}/portrait_xlarge.${character.Thumbnail.extension}`}
                          alt={character.Title}
                          className="favorites-card-image"
                        />
                      </Link>
                      <h3>{character.Title}</h3>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>
        )}
      <Footer />
    </>
  );
};

export default Favorites;
