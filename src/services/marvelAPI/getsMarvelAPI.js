import axios from 'axios';
import MarvelAPIKeyGen from './MarvelAPIKeyGen';

const data = async (URL) => {
  const marvelData = await axios.get(URL)
    .then((response) => response.data)
    .catch((err) => err.response.data);
  return marvelData;
};

const getMarvelAPI = async (type, id) => {
  const key = MarvelAPIKeyGen();
  const URL_CHARACTERS_LIST = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=50&ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;
  const URL_CHARACTER_BY_NAME = `https://gateway.marvel.com:443/v1/public/characters?name=${id}&ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;
  const URL_CHARACTER_BY_ID = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;
  const URL_CHARACTER_BY_COMIC = `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?orderBy=name&limit=10&ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;
  const URL_COMICS_LIST = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&noVariants=false&orderBy=title&limit=50&ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;
  const URL_COMIC_BY_TITLE = `https://gateway.marvel.com:443/v1/public/comics?title=${id}&ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;
  const URL_COMIC_BY_ID = `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;
  const URL_COMICS_BY_CHARACTER = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?format=comic&formatType=comic&noVariants=false&orderBy=title&limit=10&ts=${key.ts}&apikey=${key.publicKey}&hash=${key.hash}`;

  switch (type) {
    case 'charsList':
      return (data(URL_CHARACTERS_LIST));
    case 'charName':
      return (data(URL_CHARACTER_BY_NAME));
    case 'charId':
      return (data(URL_CHARACTER_BY_ID));
    case 'charsByComic':
      return (data(URL_CHARACTER_BY_COMIC));
    case 'comicsList':
      return (data(URL_COMICS_LIST));
    case 'comicTitle':
      return (data(URL_COMIC_BY_TITLE));
    case 'comicId':
      return (data(URL_COMIC_BY_ID));
    case 'comicsByChar':
      return (data(URL_COMICS_BY_CHARACTER));
    default:
      return '';
  }
};

export default getMarvelAPI;
