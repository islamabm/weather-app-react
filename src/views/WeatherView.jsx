import React from 'react'
import { GoogleMaps } from '../cmps/GoogleMaps'
import { LineChart } from '../cmps/LineChart'
import WeatherData from '../cmps/WeatherData'
import AppHeader from '../cmps/AppHeader'

import Forecats from '../cmps/Forecats'
import { eventBus } from '../services/event-bus.service'
function WeatherView() {
  const [weatherData, setWeatherData] = React.useState(null)

  React.useEffect(() => {
    eventBus.on('full-weather-data', setWeatherData)
    return () => eventBus.remove('full-weather-data')
  }, [])
  return (
    <>
      <AppHeader />
      <div className="container">
        <GoogleMaps />
        <WeatherData />
        <Forecats />
        {weatherData && <LineChart weatherData={weatherData} />}
      </div>
    </>
  )
}

export default WeatherView
