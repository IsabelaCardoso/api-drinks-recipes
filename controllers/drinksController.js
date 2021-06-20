const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes'); 
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const drinksService = require('../services/drinksService');

const newDrink = rescue(async (req, res) => {
  const { authorization } = req.headers;

  res.status(StatusCodes.CREATED).json(drink);
});


module.exports = {
  newDrink,
};
