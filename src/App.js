import { result } from 'lodash';
import { useState } from 'react';
const api = {
  key: "18d2dc8e7fcc16835f96c1080e6497a2",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
    });
  }
}

  const dateBuilder =(d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.id != "undefined") ?
    　 ((weather.weather[0].id > 0 && weather.weather[0].id < 200) ? 'app sunny' :
      (weather.weather[0].id > 199 && weather.weather[0].id < 300) ?'app thunderstorm':
      (weather.weather[0].id > 299 && weather.weather[0].id < 400) ?'app drizzle':
      (weather.weather[0].id > 499 && weather.weather[0].id < 600) ?'app rain':
      (weather.weather[0].id > 599 && weather.weather[0].id < 700) ?'app snow':
      (weather.weather[0].id > 699 && weather.weather[0].id < 800) ?'app atmosphere':
      (weather.weather[0].id == 800) ?'app clear':
      (weather.weather[0].id > 800 && weather.weather[0].id < 900) ?'app clouds':
      'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
            {Math.round(weather.main.temp)}°F
            </div>
            <div className="weather">
            {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
