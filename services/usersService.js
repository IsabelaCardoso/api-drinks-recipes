const { User } = require('../models');
// const { userToken } = require('../helpers/authentication');

const { alreadyExistEmail, validEntries } = require('../helpers/validations/usersValidation');

const addUser = async (firstName, lastName, email, password) => {
  const data = { firstName, lastName, email, password };
  validEntries(data);
  await alreadyExistEmail(email);
  const user = await User.create({ firstName, lastName, email, password });
  delete user.password;
  return user;
};

const userLogin = async (email, password) => {
  const data = {
    firstName: 'firstName default',
    lastName: 'lastName default',
    email,
    password
  };
  validEntries(data);
  
  const user = await User.findOne({ where: { email } });
  if (user && user.password === password) {
    delete user.password;
    return user;
  }
  throwNewError('Invalid fields', 'bad_request');
};

module.exports = {
  addUser,
  userLogin,
};