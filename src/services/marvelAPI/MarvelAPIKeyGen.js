const md5 = require('md5');

const MarvelAPIKeyGen = () => {
  const ts = Date.now();
  const privateKey = 'c7392c3e84d7bda4eabb0ba4171e759e86714b2a';
  const publicKey = 'a4d732bbe1efa51225991fe30d28def7';
  const hash = md5(`${ts}${privateKey}${publicKey}`);
  return { ts, publicKey, hash };
};

export default MarvelAPIKeyGen;
