const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserToken = (user) => {
  const { id, firstName, lastName, email } = user;
  const jwtConfig = {
    expiresIn: 60 * 5 * 100,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ id, firstName, lastName, email }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  createUserToken,
};