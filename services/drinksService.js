const { Op } = require('sequelize');
const Joi = require('joi');
const { Drink, Ingredient } = require('../models');
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const {
  validateDrinksTableEntries,
  checkIfDrinkExists,
  limitIdEditing,
  validateIngredients,
  validateName,
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

  await Drink.create({ name, category, instructions, image });
  const newDrink = await Drink.findOne({ where: { name } });
  await addNewIngredients(ingredientsList, newDrink.dataValues.id);

  const completeDrinkRecipe = findOneById(newDrink.id);
  return completeDrinkRecipe;
};

const addNewIngredients = async(list, drinkId) => {
  await Promise.all(list.map(async(itens) => {
    limitIdEditing(itens);
    Ingredient.create({ drinkId, ingredient: itens.ingredient, measure: itens.measure });
  }
  ))};

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
  validateName(name);

  let matchDrinks = await Drink.findAll({
    where: { name: { [Op.substring]: `%${name}%` } },
    include: [{ model: Ingredient, as: 'ingredients' }],
  }).then((result) => result);

  if (matchDrinks.length < 1) {
    matchDrinks = undefined;
    return matchDrinks;
  }
  return matchDrinks;
};

const updateById = async (id, body) => {
  await checkIfDrinkExists(id, 'findByPk');
  limitIdEditing(body);
  const ingredientsList = body.ingredients;
  await Drink.update({ ...body }, { where: { id } });
  await Ingredient.destroy({ where: { drinkId: id } });
  await addNewIngredients(ingredientsList, id);

  const updatedDrink = await findOneById(id);
  return updatedDrink;
};

const excludeById = async (id) => {
  await checkIfDrinkExists(id, 'findByPk');
  await Drink.destroy({ where: { id } });
  return null;
};

module.exports = {
  addDrink,
  findOneById,
  findByFirstLetter,
  findAllByName,
  updateById,
  excludeById,
};