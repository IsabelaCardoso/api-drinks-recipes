const { StatusCodes } = require('http-status-codes'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log('token', authorization)
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Token not found' });
      }
    console.log(jwt.verify(authorization, process.env.JWT_SECRET));

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

const decodeToken = (token) => {
  const decodedtoken = jwt.decode(token);
  return decodedtoken;
};

module.exports = {
  validateToken,
  decodeToken,
};