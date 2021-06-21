const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routers/index')
const user = require('./routers/user')
const area = require('./routers/area')
const profile = require('./routers/profile')
const reservation = require('./routers/reservation')

const app = express();
const path = process.env.PORT || 8080;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/',index);
app.use(user)
app.use(area)
app.use(profile)
app.use(reservation)

app.listen(path,()=>{
    console.log(`Servidor iniciado en el puerto ${path}`);
})