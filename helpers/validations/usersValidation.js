const Joi = require('joi');
const { User } = require('../../models');
const throwNewError = require('./throwNewError');

const validEntries = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    }).validate(data);

  if (schema.error) throwNewError(schema.error.details[0].message, 'bad_request');
};

const alreadyExistEmail = async (email) => {
  const existUser = await User.findOne({ where: { email } });
  if (existUser) throwNewError('User already registered', 'conflict');
};

module.exports = {
  validEntries,
  alreadyExistEmail
};
