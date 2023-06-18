import React, { Component } from 'react'
import { eventBus } from '../services/event-bus.service'
export default class WeatherData extends Component {
  state = {
    name: '',
    icon: '',
    temp: null,
    speed: '',
    deg: '',
    fullWeatherData: [],
  }

  componentDidMount() {
    this.eventBusSubscription = eventBus.on('full-weather-data', (data) => {
      console.log('data', data)
      const { list, city } = data
      console.log('city', city)
      console.log('data', data)
      const { name } = city

      const { weather, main, wind } = list[0]
      const temp = main.temp - 273.15
      this.setState({
        name: name,

        icon: weather[0].icon,
        temp: temp,
        speed: wind.speed,
        deg: wind.deg,
        fullWeatherData: list.slice(0, 10),
      })
    })
  }

  componentWillUnmount() {
    this.eventBusSubscription()
  }

  render() {
    const { name, icon, temp, speed, deg, fullWeatherData } = this.state
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`

    return (
      <div className="weather-section">
        <div className="first-res-list">
          <div>
            <img src={iconUrl} alt="weather icon" />
          </div>
          <div>
            <p>City</p>
            <p className="special-p">{name}</p>
          </div>
          <div>
            <p>Temperature</p>
            <p className="special-p">
              {typeof temp === 'number' ? temp.toFixed(2) + '°' : 'No data'}
            </p>
          </div>
          <div>
            <p>Wind</p>
            <p className="special-p">{`Speed: ${speed}, Deg: ${deg}`}</p>
          </div>
        </div>
        <div className="first-ten-results-list">
          {fullWeatherData.map((item, index) => {
            const icon = item.weather[0].icon
            const iconUrl = `https://openweathermap.org/img/w/${icon}.png`

            const temp = item.main.temp - 273.15

            const hour = new Date(item.dt_txt).getHours()
            const minute = new Date(item.dt_txt).getMinutes()

            const amOrPm = hour >= 12 ? 'pm' : 'am'
            const formattedHour = `${hour.toString().padStart(2, '0')}:${minute
              .toString()
              .padStart(2, '0')}`
            // const formattedHour = hour % 12 || 12
            console.log('hour', hour)
            return (
              <div key={index} className={`result result-${index + 1}`}>
                <p>
                  {formattedHour} {amOrPm}
                </p>
                <img src={iconUrl} alt="weather icon" />
                <p>{temp.toFixed(2)}°</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
