const express = require('express');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const chalk = require('chalk');
const middelware = require('./middleware/authenticator')
const admin = require('./middleware/admin');

const app = express();
const path = process.env.PORT || 8080;

const login = require('./routers/login');
const loginProcess = require('./routers/process_login');
const index = require('./routers/index');
const logout = require('./routers/logout')
const user = require('./routers/user');
const area = require('./routers/area');
const profile = require('./routers/profile');
const adminRouter = require('./routers/admin')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(session({ secret: 'token-muy-secreto', resave: true, saveUninitialized: true }));
app.use(flash());


app.use(middelware);
app.use('/',login);
app.use('/login-process',loginProcess);
app.use('/index',index);
app.use(admin);
app.use('/admin',adminRouter)
app.use('/logout',logout);
app.use(user);
app.use(area);
app.use(profile);

app.listen(path,()=>{
    console.log(chalk.green(`Servidor iniciado en el puerto ${path}`));
})