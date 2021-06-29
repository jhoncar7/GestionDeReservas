const chalk = require('chalk');
const fs = require('fs');

function validateEnvFile() {
    if (!fs.existsSync(__dirname + '/' + '.env')) {
        console.log(chalk.red('No se encontro el archivo .env en la ruta del proyecto (necesario para iniciar el servidor)'));
        process.exit(0);
    }
    if (process.env.MONGO_URI == undefined) {
        console.log(chalk.red('No se encontro la propiedad MONGO_URI en el archivo .env'));
        process.exit(2);
    }
    if (process.env.SECRET == undefined) {
        console.log(chalk.red('No se encontro la propiedad SECRET en el archivo .env'));
        process.exit(2);
    }
    if (process.env.WEATHER_KEY == undefined) {
        console.log(chalk.red('No se encontro la propiedad WEATHER_KEY en el archivo .env'));
        process.exit(2);
    }
}

module.exports = { validateEnvFile }