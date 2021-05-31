import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MarvelContext from '../context/MarvelContext';
import APIGet from '../services/APIGet';

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
      <main>
        <section>
          <div>
            <ul>
              {favorites.comics.map((comic) => (
                <li>
                  <Link
                    onClick={() => setCollection('comics')}
                    to={`/card/${comic.id}`}
                  >
                    <img
                      src={`${comic.Thumbnail.path}/portrait_xlarge.${comic.Thumbnail.extension}`}
                      alt={comic.Title}
                    />
                  </Link>
                  <h3>{comic.Title}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {favorites.characters.map((character) => (
                <li>
                  <Link
                    onClick={() => setCollection('characters')}
                    to={`/card/${character.id}`}
                  >
                    <img
                      src={`${character.Thumbnail.path}/portrait_xlarge.${character.Thumbnail.extension}`}
                      alt={character.Title}
                    />
                  </Link>
                  <h3>{character.Title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Favorites;
