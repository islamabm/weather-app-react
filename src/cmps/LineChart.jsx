import React, { useState, useEffect } from 'react'
import CanvasJSReact from '@canvasjs/react-charts'

var CanvasJSChart = CanvasJSReact.CanvasJSChart

export const LineChart = ({ weatherData }) => {
  const [dataPoints, setDataPoints] = useState([])
  const [chartType, setChartType] = useState('Temperature')
  useEffect(() => {
    if (weatherData && weatherData.list) {
      let data
      if (chartType === 'Temperature') {
        data = weatherData.list.map((item) => {
          return {
            x: new Date(item.dt * 1000),
            y: item.main.temp - 273.15,
          }
        })
      } else if (chartType === 'Rain') {
        data = weatherData.list.map((item) => {
          return {
            x: new Date(item.dt * 1000),
            y: item.rain && item.rain['3h'] ? item.rain['3h'] : 0,
          }
        })
      }
      setDataPoints(data)
    }
  }, [weatherData, chartType])

  const options = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text:
        chartType === 'Temperature'
          ? 'Temperature Forecast'
          : 'Chances of Rain',
    },
    axisY: {
      title:
        chartType === 'Temperature'
          ? 'Temperature (in °C)'
          : 'Rain volume (in mm)',
      includeZero: false,
    },
    data: [
      {
        type: 'spline',
        showInLegend: true,
        legendText:
          weatherData && weatherData.city ? weatherData.city.name : '',
        dataPoints: dataPoints,
      },
    ],
  }
  const handleSelectChange = (event) => {
    setChartType(event.target.value)
  }

  return (
    <div className="line-chart">
      <div className="select">
        <select
          className="select-chart"
          name="format"
          id="format"
          onChange={handleSelectChange}
        >
          <option value="Temperature">Temperature Forecast</option>
          <option value="Rain">Chances of Rain</option>
        </select>
      </div>
      <CanvasJSChart options={options} />
    </div>
  )
}
