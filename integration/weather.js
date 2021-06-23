const fetch = require('node-fetch');
const WEATHER_KEY = process.env.WEATHER_KEY;

async function getWeather(date) {
	const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=-34.58&lon=-58.44&exclude=minutely,hourly&units=metric&lang=es&appid=${WEATHER_KEY}`)
	const weather = await data.json()
	let getDate = new Date(date * 1000).getDate();
	var weatherObj;
	weather.daily.forEach(day => {
		let getCurrentDay = new Date(day.dt * 1000).getDate();
		if(getDate == getCurrentDay){
			weatherObj = { fecha: new Date(date*1000).toLocaleDateString(),
							minima : day.temp.min, 
							maxima: day.temp.max, 
							humedad: day.humidity, 
							descripcion: day.weather[0].description
			}
		}
	});
	return weatherObj;
}

module.exports = getWeather;