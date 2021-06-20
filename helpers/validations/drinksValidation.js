const Joi = require('joi');
const { Drink } = require('../../models');
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

  if (validateMandatoryItems.error) throwNewError(validateMandatoryItems.error.details[0].message, 'bad_request');
};

const checkIfDrinkExists = async(drinkId, userId) => {
  const drink = await Drink.findByPk(drinkId);
  if (!drink) throwNewError('Drinks does not exist', 'not_found');
  if (drink.userId !== userId) throwNewError('Unauthorized user', 'unauthorized');
  return null;
};

const limitsEditableFields = (data) => {
  if (data.id) throwNewError('Drink id cannot be edited', 'bad_request');
  if (data.strDrink) throwNewError('Drink name cannot be edited', 'bad_request');
  if (data.userId) throwNewError('User id cannot be edited', 'bad_request');
};

module.exports = {
  validDrinksEntries,
  checkIfDrinkExists,
  limitsEditableFields,
}
