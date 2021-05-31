/* eslint-disable max-len */
import React from 'react';
import github from '../images/github.svg';
import linkedin from '../images/linkedin.svg';

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-main">
      <div className="footer-botton-logo" />
      <div className="footer-list-links">
        <ul>
          <li>
            <a href="https://www.marvel.com/corporate/about" className="footer-links" target="_blank" rel="noreferrer">About Marvel</a>
          </li>
          <li>
            <a href="https://www.marvelhq.com/" className="footer-links" target="_blank" rel="noreferrer">Marvelhq.com</a>
          </li>
          <li>
            <a href="https://www.disneyplus.com/brand/marvel?cid=DTCI-Synergy-Marvel-Site-Acquisition-Library-US-Marvel-NA-EN-NavFooter-Marvel_DisneyPlus_NavFooter_Evergreen-NA" className="footer-links" target="_blank" rel="noreferrer">Disney+</a>
          </li>
        </ul>
      </div>
      <div className="footer-about">
        <h3 className="footer-about-title">About</h3>
        <p>This Web Site is the result of a fun challenge, many lines of code and a passion for my work.</p>
        <p>This is a page created by a Marvel fan.</p>
      </div>
    </div>
    <div className="footer-botton-links">
      <ul>
        <li>
          <a href="https://github.com/Digo-Castro" className="footer-links" target="_blank" rel="noreferrer">
            <img src={github} alt="GitHub" className="icon-link" />
            <span className="text-link">GitHub</span>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/dev-rodrigocastro/" className="footer-links" target="_blank" rel="noreferrer">
            <img src={linkedin} alt="LinkedIn" className="icon-link" />
            <span className="text-link">LinkedIn</span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
