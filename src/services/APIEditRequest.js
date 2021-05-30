import axios from 'axios';

const APIEditRequest = async (OLDEmail, NEWName, NEWEmail) => {
  const URL_REQUEST = 'https://shielded-spire-94032.herokuapp.com/api/users/edit';

  const data = await axios.post(URL_REQUEST, {
    oldEmail: `${OLDEmail}`,
    newName: `${NEWName}`,
    newEmail: `${NEWEmail}`,
  })
    .then((response) => response.data)
    .catch((err) => (err.response.data));
  return data;
};

export default APIEditRequest;
