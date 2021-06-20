const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes'); 
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const drinksService = require('../services/drinksService');

const newDrink = rescue(async (req, res) => {
  const body = req.body;
  const { authorization } = req.headers;
  const drink = await drinksService.addDrink(body, authorization);

  res.status(StatusCodes.CREATED).json(drink);
});

const getByFirstLetter = rescue(async (req, res) => {
  const { letter } = req.params;
  const drinksList = await drinksService.findByFirstLetter(letter);

  res.status(StatusCodes.CREATED).json({ drinks: drinksList });
});

const getByName = rescue(async (req, res) => {
  const { name } = req.params;
  const drink = await drinksService.findByName(name);

  res.status(StatusCodes.CREATED).json({ drinks: drink });
});

const updateDrink = rescue(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const token = req.headers.authorization;
  const userId = decodeToken(token).id;

  const drink = await drinksService.updateById(id, body, userId);

  res.status(StatusCodes.OK).json(drink);
});

updateDrink

module.exports = {
  newDrink,
  getByFirstLetter,
  getByName,
  updateDrink,
};
