
# Weather app


This React application allows users to fetch and analyze weather data to aid in event planning. The application makes use of OpenAI for advice and suggestions, weather API for weather data and Google Maps for location services.

Main Features
1-Fetch weather data based on user input (city, country)
2-Display detailed forecast of the selected location
3-Fetch event planning advice based on current weather and user queries
4-Showcase weather trends on a line chart
5-Pinpoint selected location on Google Maps with a weather-dependent icon
6-Store weather data for later analysis and planning




AppHeader.jsx: Handles user input for city and country. Fetches weather data on form submit and triggers relevant event bus events.

EventPlanner.jsx: Manages the event planning modal. Uses OpenAI service to fetch event planning advice based on the user's question and current weather.

Forecast.jsx: Subscribes to the 'full-weather-data' event to receive full weather data and displays it grouped by date.

GoogleMaps.jsx: Displays a Google Map with a marker at the selected city. The marker's icon changes based on the current temperature.

LineChart.jsx: Shows a line chart of temperature or rain forecast using CanvasJS.

WeatherView.jsx: Coordinates between different components. It manages the state of weatherData, which is passed to LineChart.

WeatherData.jsx: A component that displays current weather data including temperature, wind speed and direction.





<h1>Signup page</h1>
<img src="[https://i.ibb.co/pr7Cyjr/image.png](https://i.ibb.co/W0195Zc/image.png)" />

<h1>Weather page</h1>
<img src="[https://i.ibb.co/gTzgKx5/image.png](https://i.ibb.co/NYFy1BW/image.png)" />

<h1>To run this project locally, first ensure that you have Node.js and npm installed on your machine. Then, follow these steps</h1>

1-Clone the repository
git clone https://github.com/islamabm/

weather-app-react
.git

2-Install the required dependencies:
npm i
3-Start the development server:
npm start
