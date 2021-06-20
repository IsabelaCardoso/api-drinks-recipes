const Joi = require('joi');
const { User } = require('../../models');

const validEntries = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    }).validate(data);
  if (schema.error) {
    const error = new Error(schema.error.details[0].message);
    error.statusCode = 'bad_request';
    throw error;
  }
};

const alreadyExistEmail = async (email) => {
  const existUser = await User.findOne({ where: { email } });
  if (existUser) {
    const error = new Error('User already registered');
    error.statusCode = 'conflict';
    throw error;
  }
};

module.exports = {
  validEntries,
  alreadyExistEmail
};
