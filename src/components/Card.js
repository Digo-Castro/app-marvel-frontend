import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MarvelContext from '../context/MarvelContext';

const Card = ({ dataCard }) => {
  const { collection } = useContext(MarvelContext);

  const { id, thumbnail } = dataCard;
  const SRC = `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;
  const cardTitle = (collection === 'comics' ? dataCard.title : dataCard.name);
  return (
    <section className="card-container">
      <h3 className="card-title">{cardTitle}</h3>
      <p className="card-id">{id}</p>
      <img
        src={SRC}
        alt={cardTitle}
        className="card-thumbnail"
      />
      <Link to={`/card/${id}`} className="card-link">Details</Link>
    </section>
  );
};

Card.propTypes = {
  dataCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string,
      extension: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Card;
