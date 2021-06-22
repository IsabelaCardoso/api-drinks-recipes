const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes'); 
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const drinksService = require('../services/drinksService');
const { Drink, Ingredient } = require('../models');
const { checkIfDrinkExists } = require('../helpers/validations/drinksValidation');

const newDrink = rescue(async (req, res) => {
  const body = req.body;
  const drink = await drinksService.addDrink(body);

  res.status(StatusCodes.CREATED).json(drink);
});

const getAllDrinks = rescue(async (req, res) => {
  const allDrinks = await Drink.findAll({
    include: [
      { model: Ingredient, as: 'ingredients' },
    ]
    }).then((result) => result);
  res.status(StatusCodes.OK).json(allDrinks);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  await checkIfDrinkExists(id, 'findByPk')
  const drink = await drinksService.findOneById(id);

  res.status(StatusCodes.OK).json(drink);
});

const getByFirstLetter = rescue(async (req, res) => {
  const { letter } = req.params;
  const drinksList = await drinksService.findByFirstLetter(letter);

  res.status(StatusCodes.CREATED).json({ drinks: drinksList });
});

const getByName = rescue(async (req, res) => {
  const { name } = req.params;
  const drink = await drinksService.findAllByName(name);
  res.status(StatusCodes.CREATED).json({ drinks: drink });
});

const updateDrinkById = rescue(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const drink = await drinksService.updateById(id, body);

  res.status(StatusCodes.OK).json(drink);
});

const deleteDrinkById = rescue(async (req, res) => {
  const { id } = req.params;
  await drinksService.excludeById(id);

  return res.status(StatusCodes.NO_CONTENT).json();
});

module.exports = {
  newDrink,
  getAllDrinks,
  getByFirstLetter,
  getByName,
  updateDrinkById,
  deleteDrinkById,
  getById,
};
