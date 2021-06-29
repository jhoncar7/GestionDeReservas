require('dotenv').config();
require('./utils').validateEnvFile()

const express = require('express');
const index = require('./routers/index');
const user = require('./routers/user');
const area = require('./routers/area');
const profile = require('./routers/profile');
const reservation = require('./routers/reservation');
const weather = require('./integration/weather');

const app = express();
const path = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/', index);
app.use(user);
app.use(area);
app.use(profile);
app.use(reservation);
app.use(weather);

app.listen(path, () => {
    console.log(`Servidor iniciado en el puerto ${path}`);
})