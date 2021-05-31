import React from 'react';
import loadingImg from '../images/spinningCircles.svg';
import '../css/loading.css';

const Loading = () => (
  <section className="loading-container">
    <div className="loading-content">
      <img src={loadingImg} alt="loading" className="image-loading" />
    </div>
    <h1 className="loading-title">Loading...</h1>
  </section>
);

export default Loading;
