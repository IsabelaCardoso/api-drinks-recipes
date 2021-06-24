const express = require('express');
const drinksController = require('../controllers/drinksController');
const { validateToken } = require('../helpers/middlewares/tokenMiddleware');

const router = express.Router();

router.post('/drink', drinksController.newDrink);
router.get('/drink/id/:id', drinksController.getById);
router.get('/drink/name/:name', drinksController.getByName);
router.get('/drink/letter/:letter', drinksController.getByFirstLetter);
router.get('/drink', drinksController.getAllDrinks);
router.put('/drink/:id', validateToken, drinksController.updateDrinkById);
router.delete('/drink/:id', validateToken, drinksController.deleteDrinkById);

module.exports = router;
