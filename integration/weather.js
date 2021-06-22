const fetch = require('node-fetch');
const WEATHER_KEY = process.env.WEATHER_KEY;
//const express = require('express');
//const router = express.Router();




//router.get('/api/v1/weather', async (req, res) => {
async function getWeather() {
	const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=-34.58&lon=-58.44&exclude=minutely,hourly&units=metric&lang=es&appid=${WEATHER_KEY}`)
	const weather = await data.json()
	res.json(weather.daily[0].weather[0].description);
	//return weather.daily[0].weather[0].description;

}
//);

module.exports = getWeather;
//module.exports = router; (Router para probar en postman)