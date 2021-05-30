import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MarvelContext from '../context/MarvelContext';
import getMarvelAPI from '../services/marvelAPI/getsMarvelAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';
import favoriteHeart from '../images/favoriteBlack.svg';
import notFavoriteHeart from '../images/favoriteBorderBlack.svg';

const CardDetail = ({ match }) => {
  const {
    collection, favorites, setFavorites, favoritesUpdate,
  } = useContext(MarvelContext);
  const [Title, setTitle] = useState('');
  const [Id, setId] = useState(0);
  const [Description, setDescription] = useState('');
  const [Thumbnail, setThumbnail] = useState('');
  const [Items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const getDetail = async () => {
    const { params: { id } } = match;

    if (collection === 'comics') {
      const detail = await getMarvelAPI('comicId', id);
      const { results } = detail.data;
      setTitle(results[0].title);
      setThumbnail(results[0].thumbnail);
      setId(results[0].id);
      setDescription(results[0].description);
      if (results[0].characters.available > 0) setItems(results[0].characters.items);
      return setIsLoading(false);
    }

    if (collection === 'characters') {
      const detail = await getMarvelAPI('charId', id);
      const { results } = detail.data;
      setTitle(results[0].name);
      setThumbnail(results[0].thumbnail);
      setId(results[0].id);
      setDescription(results[0].description);
      if (results[0].comics.available > 0) setItems(results[0].comics.items);
      return setIsLoading(false);
    }
  };

  const initialFavorites = () => {
    const { params: { id } } = match;
    const { characters, comics } = favorites;
    if (collection === 'comics') {
      const comicsList = comics;
      if (comicsList.length > 0) {
        const search = comicsList.find((item) => item === id);
        if (search) {
          return setIsFavorite(true);
        }
      }
    }
    if (collection === 'characters') {
      const charsList = characters;
      if (charsList.length > 0) {
        const search = charsList.find((item) => item === id);
        if (search) {
          return setIsFavorite(true);
        }
      }
    }
  };

  const handleFavorite = () => {
    const { params: { id } } = match;
    const { characters, comics } = favorites;
    if (collection === 'comics') {
      const comicsList = comics;
      if (comicsList.length < 1) {
        comicsList.push(id);
        setFavorites({ characters, comics: comicsList });
        favoritesUpdate();
        return setIsFavorite(true);
      }
      const search = comicsList.find((item) => item === id);
      if (search) {
        const newList = comicsList.filter((item) => item !== id);
        setFavorites({ characters, comics: newList });
        favoritesUpdate();
        return setIsFavorite(false);
      }
      comicsList.push(id);
      setFavorites({ characters, comics: comicsList });
      favoritesUpdate();
      return setIsFavorite(true);
    }
    if (collection === 'characters') {
      const charsList = characters;
      if (charsList.length < 1) {
        charsList.push(id);
        setFavorites({ comics, characters: charsList });
        favoritesUpdate();
        return setIsFavorite(true);
      }
      const search = charsList.find((item) => item === id);
      if (search) {
        const newList = charsList.filter((item) => item !== id);
        setFavorites({ comics, characters: newList });
        favoritesUpdate();
        return setIsFavorite(false);
      }
      charsList.push(id);
      setFavorites({ comics, characters: charsList });
      favoritesUpdate();
      return setIsFavorite(true);
    }
  };

  const renderList = () => {
    if (Items) {
      const LIMIT_MAX = 10;
      const limit = (LIMIT_MAX <= Items.length ? LIMIT_MAX : Items.lastItem);
      return (
        <ul className="detail-list">
          {Items.slice(0, limit).map((item) => {
            const resourceURISplit = item.resourceURI.split('/');
            const pathURI = resourceURISplit[(resourceURISplit.length) - 1];
            return <li key={pathURI}><Link to={`/${pathURI}`}>{item.name}</Link></li>;
          })}
        </ul>
      );
    }
  };

  const checkHeart = () => {
    if (isFavorite) {
      return favoriteHeart;
    }
    return notFavoriteHeart;
  };

  useEffect(() => initialFavorites(), [isLoading]);

  if (isLoading) {
    getDetail();
    return <p>Loading</p>;
  }

  return (
    <>
      <Header />
      <main>
        <section className="detail-card-container">
          <div className="detail-card-main">
            <div className="detail-card-thumbnail-container">
              <img
                src={`${Thumbnail.path}/portrait_incredible.${Thumbnail.extension}`}
                alt={Title}
                className="detail-card-thumbnail"
              />
            </div>
            <section className="infos-container">
              <div className="detail-card-title-container">
                <h1 classNamedetail-card-title>{Title}</h1>
                <button type="button" className="favorite-btn" onClick={handleFavorite}>
                  <img src={checkHeart()} alt="Favorite Heart" className="favorite-btn" />
                </button>
              </div>
              <div className="detail-card-subtitle-container">
                <h2>ID: {Id}</h2>
              </div>
              <p className="card-description">{Description}</p>
            </section>
          </div>
          <div className="detail-card-lists">
            {renderList()}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

CardDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CardDetail;
