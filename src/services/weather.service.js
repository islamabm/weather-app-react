export const weatherService = {
  getWeatherData,
}

async function getWeatherData(city, country) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_KEY}`
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  } else {
    const data = await response.json()
    return data
  }
}
