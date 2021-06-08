const axios = require('axios');

async function APIGetUser(id) {
  const URL_REQUEST = `https://shielded-spire-94032.herokuapp.com/api/users/${id}`;
  const data = await axios.get(URL_REQUEST)
    .then((response) => response.data)
    .catch((err) => (err.response.data));
  return data;
}

export default APIGetUser;
