const { Op } = require('sequelize');
const Joi = require('joi');
const { Drink } = require('../models');
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const {
  validDrinksEntries,
  checkIfDrinkExists,
  limitsEditableFields,
  validateSearch,
} = require('../helpers/validations/drinksValidation');
const throwNewError = require('../helpers/validations/throwNewError');

const addDrink = async (body, authorization) => {
  validDrinksEntries(body);
  const userId = decodeToken(authorization).id;
  const drink = await Drink
    .create({ ...body, userId, published: new Date(), updated: new Date() });

  return drink;
};

const findByFirstLetter = async (letter) => {
  const validateLetter = Joi.object({ letter: Joi.string().max(1) }).validate({ letter });
  if (validateLetter.error) throwNewError(validateLetter.error.details[0].message, 'bad_request');

  const matchDrinks = Drink.findAll({
    where: { strDrink: { [Op.startsWith]: `${letter}%` } }
  }).then((result) => result);
  return matchDrinks;
};

const findByName = async (name) => {
  const validateName = Joi.object({ name: Joi.string().min(2) }).validate({ name });
  if (validateName.error) throwNewError(validateName.error.details[0].message, 'bad_request');

  let matchDrinks = Drink.findAll({
    where: { strDrink: { [Op.substring]: `%${name}%` } }
  }).then((result) => result);
  if (matchDrinks.drinks.length < 1) {
    matchDrinks = undefined;
    return matchDrinks;
  }
  console.log('MATCHDRINK', matchDrinks);
  return matchDrinks;
};

const findById = async (id) => {
  const updatedDrink = await Drink.findAll();
  return updatedDrink;

  // const drink = await Drink.findByPk(id);
  // if (!drink) throwNewError('Drinks does not exist', 'not_found');
  // console.log('drink service', drink);
  // return drink;
};

const updateById = async (id, body, userId) => {
  await checkIfDrinkExists(id, userId);
  limitsEditableFields(body);
  console.log('cheguei aqui')
  await Drink.update({ ...body, updated: new Date() }, { where: { id } });

  const updatedDrink = await Drink.findByPk(id);
  return updatedDrink;
};

const excludeById = async (id, userId) => {
  await checkIfDrinkExists(id, userId);
  await Drink.destroy({ where: { id } });
  return 'deleted';
};

module.exports = {
  addDrink,
  findByFirstLetter,
  findByName,
  updateById,
  excludeById,
  findById,
};