const { Op } = require('sequelize');
const Joi = require('joi');
const { Drink, Ingredient } = require('../models');
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const {
  validateDrinksTableEntries,
  checkIfDrinkExists,
  limitsEditableFields,
  validateIngredients,
  drinkAlreadyExist,
  validateSearch,
} = require('../helpers/validations/drinksValidation');
const throwNewError = require('../helpers/validations/throwNewError');

const findOneById = async(id) => {
  const completeDrink = await Drink.findAll({ where: { id },
      include: [
        { model: Ingredient, as: 'ingredients' },
      ]
      }).then((result) => result);
      console.log('completeDrink[0].dataValues.ingredients --caminho');
  return completeDrink;
};

const addDrink = async (body, authorization) => {
  const { name, category, instructions, image} = body;
  await checkIfDrinkExists(name, 'findByName');
  validateDrinksTableEntries({ name, category, instructions, image });
  const ingredientsList = validateIngredients(body);
  console.log('INGRED LIST', ingredientsList);

  await Drink.create({ name, category, instructions, image });
  const newDrink = await Drink.findOne({ where: { name } });
  await Promise.all(ingredientsList.map(async(itens) => Ingredient.create({ drinkId: newDrink.dataValues.id, ingredient: itens.ingredient, measure: itens.measure })));

  const completeDrinkRecipe = findOneById(newDrink.id);
  return completeDrinkRecipe;
};

const findByFirstLetter = async (letter) => {
  const validateLetter = Joi.object({ letter: Joi.string().max(1) }).validate({ letter });
  if (validateLetter.error) throwNewError(validateLetter.error.details[0].message, 'bad_request');

  const matchDrinks = Drink.findAll({
    where: { name: { [Op.startsWith]: `${letter}%` } },
    include: [
      { model: Ingredient, as: 'ingredients' },
    ]
  }).then((result) => result);
  return matchDrinks;
};

const findAllByName = async (name) => {
  const validateName = Joi.object({ name: Joi.string().min(2) }).validate({ name });
  if (validateName.error) throwNewError(validateName.error.details[0].message, 'bad_request');

  let matchDrinks = Drink.findAll({
    where: { strDrink: { [Op.substring]: `%${name}%` } }
  }).then((result) => result);
  if (matchDrinks.drinks.length < 1) {
    matchDrinks = undefined;
    return matchDrinks;
  }
  return matchDrinks;
};

const updateById = async (id, body, userId) => {
  await checkIfDrinkExists(id, 'findByPk');
  limitsEditableFields(body);
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
  findOneById,
  findByFirstLetter,
  findAllByName,
  updateById,
  excludeById,
};