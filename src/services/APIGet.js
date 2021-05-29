const axios = require('axios');

async function APIGet(token) {
  const URL_REQUEST = `https://shielded-spire-94032.herokuapp.com/api/users/verify/${token}`;

  const data = await axios.get(URL_REQUEST)
    .then((response) => response.data)
    .catch((err) => (err.response.data));
  return data;
}

export default APIGet;
