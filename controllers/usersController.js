const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes'); 
const { createUserToken } = require('../helpers/authentication/auth');
const usersService = require('../services/usersService');

const newUser = rescue(async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await usersService.addUser(fullName, email, password);
  const token = createUserToken(user);

  res.status(StatusCodes.CREATED).json({ token });
});

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await usersService.userLogin(email, password);
  const token = createUserToken(user);

  return res.status(StatusCodes.OK).json({ token });
});


module.exports = {
  newUser,
  userLogin,
};
