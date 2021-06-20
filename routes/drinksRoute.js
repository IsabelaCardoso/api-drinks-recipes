const express = require('express');
const drinksController = require('../controllers/drinksController');
const { validateToken } = require('../helpers/middlewares/tokenMiddleware');

const router = express.Router();

router.post('/drink', drinksController.newDrink);
router.get('/drink/:letter', validateToken, drinksController.getByFirstLetter);
router.get('/drink/name/:name', validateToken, drinksController.getByName);
// router.get('/drink/:id', validateToken, drinksController.getById);
router.put('/drink/:id', validateToken, drinksController.updateDrink);
// router.delete('/drink/:id', validateToken, drinksController.deletedrink);

module.exports = router;
