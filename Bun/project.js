const apiKey1 = '01bab4749d8f4bd18dee1c13d1dc32e6';
const apiKey2 = '2a613dcf4fad63110a750c9b19b86759';
const apiUrlCurrent =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=&lang=ro';
const apiUrlForecast =
  'https://api.openweathermap.org/data/2.5/forecast?q=&units=metric';
const apiUrlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=2a613dcf4fad63110a750c9b19b86759`;

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function getGeo() {
  const respGeo = await fetch(
    'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=2a613dcf4fad63110a750c9b19b86759'
  );
  const dataGeo = await respGeo.json();
  const { latitude, longitude } = dataGeo;

  document.getElementById('lat').innerHTML = latitude;
  document.getElementById('lon').innerHTML = longitude;

}
getGeo();

async function checkWeather(city) {
  const response = await fetch(
    apiUrlCurrent + city + '01bab4749d8f4bd18dee1c13d1dc32e6'
  );
  var data = await response.json();

  console.log(data);
  document.querySelector('.city-name').innerHTML = data.name;
  document.querySelector('.temperature').innerHTML =
    Math.round(data.main.temp) + '°C';
  document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
  document.querySelector('.temp-res').innerHTML =
    Math.round(data.main.feels_like) + '°C';
  document.querySelector('.sunrise').innerHTML = data.sys.sunrise;
  document.querySelector('.sunset').innerHTML = data.sys.sunset;

  if (data.weather[0].main == 'Clouds') {
    weatherIcon.src = 'images/clouds.png';
  } else if (data.weather[0].main == 'Clear') {
    weatherIcon.src = 'images/clear.png';
  } else if (data.weather[0].main == 'Rain') {
    weatherIcon.src = 'images/rain.png';
  } else if (data.weather[0].main == 'Drizzle') {
    weatherIcon.src = 'images/drizzle.png';
  } else if (data.weather[0].main == 'Mist') {
    weatherIcon.src = 'images/mist.png';
  }

  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metrics&appid=${apiKey1}`
  );
  const forecastData = await forecastResponse.json();

  console.log(forecastData);
  for (let i = 0; i < 5; i++) {
    document.getElementById('day' + (i + 1) + 'Min').innerHTML =
      'Min: ' +
      Number(forecastData.list[i].main.temp_min - 273.15).toFixed(1) +
      '°';
    document.getElementById('day' + (i + 1) + 'Max').innerHTML =
      'Max: ' +
      Number(forecastData.list[i].main.temp_max - 273.15).toFixed(2) +
      '°';
    document.getElementById('img' + (i + 1)).src =
      'https://openweathermap.org/img/wn/' +
      forecastData.list[i].weather[0].icon +
      '.png';
    document.getElementById('day' + (i + 1)).innerHTML = weekday[checkDay(i)];
  }

  for (let i = 0; i < 8; i++) {
    document.getElementById('hour' + (i + 1)).innerHTML =
      'Ora/Data: ' + Number(forecastData.list[i].dt_txt);
    document.getElementById('temp' + (i + 1)).innerHTML =
      Math.round(forecastData.list[i].main.temp - 273.15) + '°';
    document.querySelector('.img-hour' + (i + 1)).src =
      'https://openweathermap.org/img/wn/' +
      forecastData.list[i].weather[0].icon +
      '.png';
    document.getElementById('hour' + (i + 1)).innerHTML = hourToString(
      new Date(forecastData.list[i].dt_txt)
    );
  }
}

function checkDay(day) {
  const d = new Date();
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

function hourToString(date) {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
