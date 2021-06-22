const { User } = require('../models');
// const { userToken } = require('../helpers/authentication');
const throwNewError = require('../helpers/validations/throwNewError');

const { alreadyExistEmail, validEntries } = require('../helpers/validations/usersValidation');

const addUser = async (fullName, email, password) => {
  validEntries({ fullName, email, password });
  await alreadyExistEmail(email);
  const user = await User.create({ fullName, email, password });
  delete user.password;
  return user;
};

const userLogin = async (email, password) => {
  const data = {
    fullName: 'fullName default',
    email,
    password
  };
  validEntries(data);
  
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return throwNewError('Invalid fields', 'bad_request');
  };
  delete user.password;
  return user;
};

module.exports = {
  addUser,
  userLogin,
};
