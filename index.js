const express = require('express');
const errorMiddleware = require('./helpers/middlewares/errorMiddleware');
const usersRoute = require('./routes/usersRoute');
const drinksRoute = require('./routes/drinksRoute');

const app = express();
app.use(express.json());

app.use(usersRoute);
app.use(drinksRoute);
// app.use(drinksRoute);

app.use(errorMiddleware);
app.listen(3000, () => console.log('ouvindo porta 3000!'));
