import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { Audio } from 'react-loader-spinner'
import { eventBus } from '../services/event-bus.service'

const containerStyle = {
  width: '500px',
  height: '400px',
}

const options = {
  zoomControlOptions: {
    position: 9,
  },
}

export function GoogleMaps() {
  const [center, setCenter] = useState({
    lat: 32.109333,
    lng: 34.855499,
  })

  const [temperature, setTemperature] = useState(null)
  const [cityName, setCity] = useState(null)
  useEffect(() => {
    const removeEventListener = eventBus.on('city-selected', (data) => {
      setCenter({ lat: data.lat, lng: data.lng })
      setTemperature(data.temp)
      setCity(data.name)
    })

    return () => {
      removeEventListener()
    }
  }, [])
  function getWeatherIcon(temp) {
    if (temp < 17) {
      return 'https://icons.iconarchive.com/icons/large-icons/large-weather/512/rain-icon.png'
    } else if (temp >= 17 && temp < 21) {
      return 'https://freesvg.org/img/stylized_basic_cloud.png'
    } else {
      return 'https://static.vecteezy.com/system/resources/previews/009/663/724/original/sun-sun-ray-icon-transparent-free-png.png'
    }
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS,
  })

  if (loadError) {
    return <div>Error loading Google Maps</div>
  }

  if (!isLoaded)
    return (
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    )
  return (
    <div className="google-maps">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
      >
        <Marker
          position={center}
          icon={{
            url: getWeatherIcon(temperature),
            size: new window.google.maps.Size(64, 64),
            scaledSize: new window.google.maps.Size(64, 64),
            anchor: new window.google.maps.Point(20, 180),
          }}
        />
        {cityName && temperature && (
          <InfoWindow position={center}>
            <div>
              <h2>{cityName}</h2>
              <p>{temperature.toFixed(2)}°C</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}
