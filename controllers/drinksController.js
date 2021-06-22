const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes'); 
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const drinksService = require('../services/drinksService');
const { Drink } = require('../models');

const newDrink = rescue(async (req, res) => {
  const body = req.body;
  const drink = await drinksService.addDrink(body);

  res.status(StatusCodes.CREATED).json(drink);
});

const getAllDrinks = rescue(async (req, res) => {
  const allDrinks = await Drink.findAll();
  res.status(StatusCodes.OK).json(allDrinks);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  const drink = await drinksService.findById(id);

  res.status(StatusCodes.OK).json(drink);
});
const getByFirstLetter = rescue(async (req, res) => {
  const { letter } = req.params;
  const drinksList = await drinksService.findByFirstLetter(letter);

  res.status(StatusCodes.CREATED).json({ drinks: drinksList });
});

const getByName = rescue(async (req, res) => {
  const { name } = req.params;
  console.log('token', req.headers.authorization)
  const drink = await drinksService.findByName(name);
  res.status(StatusCodes.CREATED).json({ drinks: drink });
});

const updateDrinkById = rescue(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const token = req.headers.authorization;
  const userId = decodeToken(token).id;
  console.log('userID', userId);
  const drink = await drinksService.updateById(id, body, userId);

  res.status(StatusCodes.OK).json(drink);
});

const deleteDrinkById = rescue(async (req, res) => {
  const { id } = req.params;
  const userId = decodeToken(req.headers.authorization).id;
  await drinksService.excludeById(id, userId);

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
