const axios = require('axios');

async function APIGeneralRequests(name, email, path, token) {
  const URL_REQUEST = `https://shielded-spire-94032.herokuapp.com/api/users/${path}`;

  const data = await axios.post(URL_REQUEST, {
    token: `${token}`,
    name: `${name}`,
    email: `${email}`,
  })
    .then((response) => console.log(response) || response.data)
    .catch((err) => {
      console.log(err.response);
      return (err.response.data);
    });
  return data;
}

export default APIGeneralRequests;
