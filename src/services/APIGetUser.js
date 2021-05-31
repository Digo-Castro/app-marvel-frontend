const axios = require('axios');

async function APIGetUser(id) {
  const URL_REQUEST = `http://localhost:8082/api/users/${id}`;
  const data = await axios.get(URL_REQUEST)
    .then((response) => response.data)
    .catch((err) => (err.response.data));
  return data;
}

export default APIGetUser;
