const express = require('express');
const router = express.Router();
const chalk = require('chalk');

router.use((req, res, next) => {
    console.log(chalk.bgGreen('se hizo una peticion'));
    next();
})

module.exports = router;