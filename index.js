const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./helpers/middlewares/errorMiddleware');
const usersRoute = require('./routes/usersRoute');
const drinksRoute = require('./routes/drinksRoute');

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRoute);
app.use(drinksRoute);

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
