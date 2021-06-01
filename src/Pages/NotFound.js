import React from 'react';
import error404 from '../images/error404.svg';
import '../css/notFound.css';

const NotFound = () => (
  <section className="not-found">
    <img src={error404} alt="Error 404" className="error-404-image" />
  </section>
);

export default NotFound;
