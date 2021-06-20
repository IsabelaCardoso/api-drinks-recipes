const { Op } = require('sequelize');
const { Drink } = require('../models');
const { decodeToken } = require('../helpers/middlewares/tokenMiddleware');
const { validDrinksEntries } = require('../helpers/validations/drinksValidation');
const throwNewError = require('../helpers/validations/throwNewError');

const addDrink = async (body, authorization) => {
  validDrinksEntries(body);
  const userId = decodeToken(authorization).id;
  const drink = await Drink
    .create({ ...body, userId, published: new Date(), updated: new Date() });

  return drink;
};

const findByFirstLetter = async (letter) => {
  validateSearch({ letter });

  const matchDrinks = Drink.findAll({
    where: { strDrink: { [Op.startsWith]: `${letter}%` } }
  }).then((result) => result);
  return matchDrinks;
};

const findByName = async (name) => {
  validateSearch({ name });

  const matchDrinks = Drink.findAll({
    where: { strDrink: { [Op.substring]: `%${name}%` } }
  }).then((result) => result);
  return matchDrinks;
};

const updateById = async (id, body, userId) => {
  const { title, content } = body;
  await checkUserIdPost(id, userId);
  await validUpdatePost(body);
  await BlogPosts.update({ title, content }, { where: { id } });
  const updatedPost = await BlogPosts.findByPk(id, {
    include: [
      { model: Users, as: 'user', attributes: { excludes: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updatedPost;
};

module.exports = {
  addDrink,
  findByFirstLetter,
  findByName,
  updateById,
};