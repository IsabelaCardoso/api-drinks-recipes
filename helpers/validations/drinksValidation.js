const Joi = require('joi');
const { Drink } = require('../../models');
const throwNewError = require('./throwNewError');

const validateDrinksTableEntries = (data) => {
  const validateItems = Joi.object({
    name: Joi.string().min(2).required(),
    category: Joi.string().required(),
    instructions: Joi.string().required(),
    image: Joi.string().required(),
    }).validate(data);

  if (validateItems.error) throwNewError(validateItems.error.details[0].message, 'bad_request');
};

const validateIngredients = (data) => {
  const { ingredients } = data;
  if (ingredients.length < 2) return throwNewError('You need to enter at least 2 ingredients', 'bad_request')
  return ingredients;
}

const checkIfDrinkExists = async(drink, origin) => {
  if (origin === 'findByPk') {
    const findDrink = await Drink.findByPk(drink);
    if (!findDrink) return throwNewError('Drinks does not exist', 'not_found');
  }
  const findDrink = await Drink.findAll({ where: { name: drink } });
  console.log('findDrink', findDrink);
    if (findDrink.length !== 0) return throwNewError('This name has already been used for another drink', 'bad_request');
  return null;
};

const limitsEditableFields = (data) => {
  if (data.id) throwNewError('Drink id cannot be edited', 'bad_request');
  if (data.strDrink) throwNewError('Drink name cannot be edited', 'bad_request');
  if (data.userId) throwNewError('User id cannot be edited', 'bad_request');
};

const validateName = (name) => {
  const validateName = Joi.object({ name: Joi.string().min(2) }).validate({ name });
  if (validateName.error) throwNewError(validateName.error.details[0].message, 'bad_request');
}

module.exports = {
  validateDrinksTableEntries,
  checkIfDrinkExists,
  limitsEditableFields,
  validateIngredients,
  validateName,
}
