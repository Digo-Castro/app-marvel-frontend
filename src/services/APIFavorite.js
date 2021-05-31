const axios = require('axios');

async function APIFavorite(email, favorites) {
  const URL_REQUEST = 'https://shielded-spire-94032.herokuapp.com/api/users/favorites';

  const data = await axios.post(URL_REQUEST, {
    email: `${email}`,
    comics: [...favorites.comics],
    characters: [...favorites.characters],
  })
    .then((response) => response.data)
    .catch((err) => (err.response.data));
  return data;
}

export default APIFavorite;
