import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MarvelContext from '../context/MarvelContext';
import '../css/card.css';

const Card = ({ dataCard }) => {
  const { collection } = useContext(MarvelContext);
  const { id, thumbnail } = dataCard;
  const SRC = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
  const cardTitle = (collection === 'comics' ? dataCard.title : dataCard.name);

  return (
    <Link to={`/card/${id}`} className="card-container">
      <h3 className="card-title">{cardTitle}</h3>
      <p className="card-id">ID: {id}</p>
      <img
        src={SRC}
        alt={cardTitle}
        className="card-thumbnail"
      />
    </Link>
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
