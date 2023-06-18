import React, { Component } from 'react'
import { eventBus } from '../services/event-bus.service'

export default class Forecats extends Component {
  state = {
    groupedData: [],
  }

  componentDidMount() {
    eventBus.on('full-weather-data', (data) => {
      this.processData(data.list)
    })
  }

  processData(data) {
    const groupedData = data.reduce((acc, item) => {
      const dateObj = new Date(item.dt * 1000)
      const date = dateObj.getDate()
      const month = dateObj.toLocaleString('default', { month: 'long' })
      const dayName = dateObj.toLocaleString('default', { weekday: 'short' })

      const formattedDate = `${date} ${month}`

      if (!acc[formattedDate]) {
        acc[formattedDate] = {
          date: formattedDate,
          dayName,
          icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
          temperatures: [],
        }
      }

      acc[formattedDate].temperatures.push(item.main.temp - 273.15)

      return acc
    }, {})

    this.setState({ groupedData: Object.values(groupedData) })
  }

  render() {
    return (
      <div className="forecats">
        <h1>Forecats</h1>
        <div className="forecats-container">
          {this.state.groupedData.map((dayData, index) => (
            <div key={index} className="day-data">
              <img src={dayData.icon} alt="weather icon" />
              <p>
                <span className="max-temp">
                  {`${Math.max(...dayData.temperatures).toFixed(2)}`}°{' '}
                </span>{' '}
                /
                <span className="min-temp">
                  {`${Math.min(...dayData.temperatures).toFixed(2)}`}°
                </span>
              </p>
              <p>{`${dayData.date}.${dayData.dayName}`}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
