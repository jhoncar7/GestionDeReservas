const express = require('express');
const chalk = require('chalk');
const middelware = require('./routers/middleware')
const apis = require('./routers/apis');

const app = express();
const path = 8080;

app.use(middelware);
app.use(apis);

app.listen(path,()=>{
    console.log(chalk.green(`Servidor iniciado en el puerto ${path}`));
})