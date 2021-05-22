const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const chalk = require('chalk');
const middelware = require('./middleware/autenticador')
const admin = require('./middleware/admin');

const app = express();
const path = process.env.PORT || 8080;

const iniciarSesion = require('./routers/iniciar_sesion');
const procesarLogin = require('./routers/procesar_login');
const index = require('./routers/index');
const cerrarSesion = require('./routers/cerrar_sesion')
const apis = require('./routers/apis');
const adminRouter = require('./routers/admin')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));
app.use(flash());


app.use(middelware);
app.use('/',iniciarSesion);
app.use('/procesar-login',procesarLogin);
app.use('/index',index);
app.use(admin);
app.use('/admin',adminRouter)
app.use('/cerrar-sesion',cerrarSesion);
app.use(apis);

app.listen(path,()=>{
    console.log(chalk.green(`Servidor iniciado en el puerto ${path}`));
})