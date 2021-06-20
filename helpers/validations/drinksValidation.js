const Joi = require('joi');
const { User } = require('../../models');
const throwNewError = require('./throwNewError');

const filtersOptionalItems = (data, listType) => {
  const ListObjIntoArray = Object.entries(data);
  const filteredList = ListObjIntoArray.filter((ingredient) => ingredient[0].toLowerCase().includes(listType));
  validateOptionalItems(filteredList);
};

const validateOptionalItems = (filteredList) => {
  filteredList.map((item, index) => {
    const keyNameWithNumbers = `${item[0]}${index + 1}`
    const validationItemSchema = Joi.object({
      keyNameWithNumbers: Joi.string(),
    }).validate(item);
  });
};

const validDrinksEntries = (data) => {
  const validateMandatoryItems = Joi.object({
    strDrink: Joi.string(2).required(),
    strAlcoholic: Joi.string().required(),
    strInstructions: Joi.string().required(),
    strDrinkThumb: Joi.string().required(),
    strIngredient1: Joi.string().required(),
    strMeasure1: Joi.string().required(),
    }).validate(data);

    filtersOptionalItems(data, 'stringredient');
    filtersOptionalItems(data, 'strmeasure');

  if (validateMandatoryItems.error) throwNewError(schema.error.details[0].message, 'bad_request');
};

const validateSearch = (data) => {
  const searchSchema = Joi.object({
    letter: Joi.string().max(1).required(),
    name: Joi.string().min(2).required(),
    }).validate(data);
  if(searchSchema.error) throwNewError(schema.error.details[0].message, 'bad_request');
}

const checkIfDrinkExists = async(drinkId, userId) => {
  const drink = await Drink.findByPk(drinkId);
  if (!drink) throwNewError('Drinks does not exist', 'not_found');
  if (drink.userId !== userId) throwNewError('Unauthorized user', 'unauthorized');
  return null;
};

const limitsEditableFields = () => {
  const schema = Joi.object({
    id: Joi.string().required(),
    userId: Joi.string().required(),
    userId: Joi.custom((value, helpers) => (
      value ? helpers.message('Categories cannot be edited') : value)),
  }).validate(data);
  if (schema.error) throwNewError(schema.error.details[0].message, 'bad_request');
};

module.exports = {
  validDrinksEntries,
  validateSearch,
  checkIfDrinkExists,
  limitsEditableFields
}
