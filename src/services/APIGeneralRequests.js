const axios = require('axios');

async function APIGeneralRequests(name, email, path) {
  const URL_REQUEST = `https://shielded-spire-94032.herokuapp.com/api/users/${path}`;

  const data = await axios.post(URL_REQUEST, {
    name: `${name}`,
    email: `${email}`,
  })
    .then((response) => response.data)
    .catch((err) => (err.response.data));
  return data;
}

export default APIGeneralRequests;
