const express = require('express');
const errorMiddleware = require('./helpers/middlewares/errorMiddleware');
const usersRoute = require('./routes/usersRoute');
const drinksRoute = require('./routes/drinksRoute');

const PORT = 3001;

const app = express();
app.use(express.json());

app.use(usersRoute);
app.use(drinksRoute);

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
