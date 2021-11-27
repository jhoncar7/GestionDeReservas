const chalk = require('chalk');
//const fs = require('fs');

/* function validateEnvFile() {
    if (!fs.existsSync(__dirname + '/' + '.env')) {
        console.log(chalk.red('No se encontro el archivo .env en la ruta del proyecto (necesario para iniciar el servidor)'));
        process.exit(0);
    }
    if (process.env.MONGO_URI == undefined) {
        console.log(chalk.red('No se encontro la propiedad MONGO_URI en el archivo .env'));
        process.exit(0);
    }
    if (process.env.SECRET == undefined) {
        console.log(chalk.red('No se encontro la propiedad SECRET en el archivo .env'));
        process.exit(0);
    }
    if (process.env.WEATHER_KEY == undefined) {
        console.log(chalk.red('No se encontro la propiedad WEATHER_KEY en el archivo .env'));
        process.exit(0);
    }
} */

function validateDate(date) {
    let reg = new RegExp('^[0-9]+$');
    if (!reg.test(date) || date.length > 20) {
        return [true, "Ingrese una fecha en formato unix"]
    }
    let dateNow = Date.now() / 1000 | 0;
    if (date - dateNow >= 604800 || date - dateNow < 0) {
        return [true, "La fecha a reservar debe ser desde el día de hoy hasta próximos los 6 días"]
    }
    return [false, ""];
}

function dateToUnix() {
    
}

function unixToDate(unix) {
    return new Date(unix * 1000).toLocaleDateString("es-AR");
}

module.exports = { validateDate, unixToDate }