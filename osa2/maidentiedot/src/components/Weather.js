import axios from "axios"
import { useState, useEffect } from "react"

const WeatherDisplay = ( {city, weather} ) =>
{
	return (
		<div>
		<h2>Weather in {city}</h2>
		temperature {(weather.main.temp-273.15).toFixed(2)} Celcius<br />
		<img src={'http://openweathermap.org/img/wn/'.concat(weather.weather[0].icon).concat('@2x.png')}
				alt="weather icon" /><br />
			wind {weather.wind.speed} m/s
		</div>
	)
}

const Weather = ( {city, lat, lon} ) =>
{
	const [weather, setWeather] = useState()
	const apikey = process.env.REACT_APP_API_KEY
	useEffect(() =>
	{
		let api = ['https://api.openweathermap.org/data/2.5/weather?lat=',
			lat.toString(), '&lon=', lon.toString(), '&appid=', apikey.toString()]
			.join('')
		if(city && lat && lon)
		{
			axios.get(api)
			.then(response =>
				{
					setWeather(response.data)
				})
		}
	}, [city, apikey, lat, lon])

	return (
		<div>
			{ weather ?
				<WeatherDisplay city={city} weather={weather} /> :
				''
			}
		</div>
	)
}

export default Weather