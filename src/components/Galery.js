import React, { useContext, useEffect } from 'react';
import MarvelContext from '../context/MarvelContext';
import getMarvelAPI from '../services/marvelAPI/getsMarvelAPI';
import Card from './Card';

const Galery = () => {
  const {
    collection, cardsList, setCardsList,
  } = useContext(MarvelContext);

  const getCollection = async () => {
    if (collection === 'comics') {
      const data = await getMarvelAPI('comicsList', '');
      return setCardsList(data.data.results);
    }
    const data = await getMarvelAPI('charsList', '');
    return setCardsList(data.data.results);
  };

  useEffect(() => getCollection(), [collection]);

  if (cardsList.length < 1) return <p>Loading</p>;
  return (
    <section className="galery-container">
      {cardsList.map((card) => <Card dataCard={card} key={card.id} />)}
    </section>
  );
};

export default Galery;
