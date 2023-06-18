import React, { Component } from 'react'
import EventPlanner from './EventPlanner'
import { weatherService } from '../services/weather.service'
import { eventBus } from '../services/event-bus.service'

export default class AppHeader extends Component {
  state = {
    city: 'haifa',
    country: 'israel',

    showModal: false,
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }))
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  async componentDidMount() {
    this.unsub = eventBus.on('location-set', ({ city, country }) => {
      this.setState({ city, country })
    })
  }

  componentWillUnmount() {
    this.unsub()
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { city, country } = this.state
    try {
      const weatherData = await weatherService.getWeatherData(city, country)
      console.log(weatherData)
      const { lat, lon: lng } = weatherData.city.coord
      let { temp } = weatherData.list[0].main
      temp = temp - 273.15
      const { name } = weatherData.city
      const weather = weatherData.list[0].weather[0].description
      this.setState({ weather })
      if (typeof lat === 'number' && typeof lng === 'number' && temp) {
        eventBus.emit('city-selected', { lat, lng, temp, name })
        eventBus.emit('full-weather-data', weatherData)
      } else {
        console.error('Invalid data:', weatherData)
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error)
    }
  }

  render() {
    return (
      <div className="choose-location-container">
        <img
          src="https://chatgptarb.com/wp-content/uploads/2023/05/cropped-chatgpt-1.png"
          onClick={this.toggleModal}
        />
        <form onSubmit={this.handleSubmit}>
          <input
            name="country"
            value={this.state.country}
            onChange={this.handleInputChange}
            className="country"
            placeholder="country"
          />
          {/* <select
              className="country-select"
              name="country"
              value={this.state.country}
              onChange={this.handleInputChange}
            >
              <option value="">Select a country</option>
              {this.state.countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select> */}

          <input
            name="city"
            value={this.state.city}
            onChange={this.handleInputChange}
            className="city"
            placeholder="City"
          />
          <button className="weather-btn" type="submit">
            Get Weather
          </button>
        </form>
        {this.state.showModal && (
          <EventPlanner
            weather={this.state.weather}
            closeModal={this.toggleModal}
          />
        )}
      </div>
    )
  }
}
