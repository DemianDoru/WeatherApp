const apiKey = '01bab4749d8f4bd18dee1c13d1dc32e6';

// const dotenv = require('dotenv');
// dotenv.config();
// let apiKey = process.env.API_KEY;
// console.log(apiKey);
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const otherApi =
  'https://api.openweathermap.org/data/2.5/forecast?q=&units=metric&units=standard';
const geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=47.0667&lon=21.9333&units=metric&appid=${apiKey}`;
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
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
    weatherIcon.src = '/BUN/images/clouds.png';
  } else if (data.weather[0].main == 'Clear') {
    weatherIcon.src = '/BUN/images/clear.png';
  } else if (data.weather[0].main == 'Rain') {
    weatherIcon.src = '/BUN/images/rain.png';
  } else if (data.weather[0].main == 'Drizzle') {
    weatherIcon.src = '/BUN/images/drizzle.png';
  } else if (data.weather[0].main == 'Mist') {
    weatherIcon.src = '/BUN/images/mist.png';
  }

  sunrise = new Date(data.sys.sunrise * 1000).toLocaleString();
  console.log(sunrise);
  document.querySelector('.sunrise').innerHTML = sunrise;
  sunset = new Date(data.sys.sunset * 1000).toLocaleString();
  console.log(sunset);
  document.querySelector('.sunset').innerHTML = sunset;

  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metrics&appid=${apiKey}`
  );
  const forecastData = await forecastResponse.json();

  console.log(forecastData);

  for (let i = 0; i < 5; i++) {
    document.getElementById('day' + (i + 1) + 'Min').innerHTML =
      'Min: ' +
      Number(forecastData.list[i].main.temp_min - 273.15).toFixed(0) +
      '°C';
    document.getElementById('day' + (i + 1) + 'Max').innerHTML =
      'Max: ' +
      Number(forecastData.list[i].main.temp_max - 273.15).toFixed(0) +
      '°C';
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
      Math.round(forecastData.list[i].main.temp - 273.15) + '°C';
    document.querySelector('.img-hour' + (i + 1)).src =
      'https://openweathermap.org/img/wn/' +
      forecastData.list[i].weather[0].icon +
      '.png';
    document.getElementById('hour' + (i + 1)).innerHTML = hourToString(
      new Date(forecastData.list[i].dt_txt)
    );
  }
}

async function getLocation() {
  const respLocation = await fetch(geoApi);
  let dataFromGeo = await respLocation.json();
  return dataFromGeo;
}

async function checkLocation() {
  const dataFromGeo = await getLocation();

  console.log(dataFromGeo);
  document.querySelector('.city-name').innerHTML = dataFromGeo.name;
  document.querySelector('.temperature').innerHTML =
    Math.round(dataFromGeo.main.temp) + '°C';
  document.querySelector('.humidity').innerHTML =
    dataFromGeo.main.humidity + ' %';
  document.querySelector('.wind').innerHTML = dataFromGeo.wind.speed + ' km/h';
  document.querySelector('.temp-res').innerHTML =
    Math.round(dataFromGeo.main.feels_like) + '°C';
  document.querySelector('.sunrise').innerHTML = dataFromGeo.sys.sunrise;
  document.querySelector('.sunset').innerHTML = dataFromGeo.sys.sunset;

  // afisare imagine locala
  if (dataFromGeo.weather[0].main == 'Clouds') {
    weatherIcon.src = 'images/clouds.png';
  } else if (dataFromGeo.weather[0].main == 'Clear') {
    weatherIcon.src = 'images/clear.png';
  } else if (dataFromGeo.weather[0].main == 'Rain') {
    weatherIcon.src = 'images/rain.png';
  } else if (dataFromGeo.weather[0].main == 'Drizzle') {
    weatherIcon.src = 'images/drizzle.png';
  } else if (dataFromGeo.weather[0].main == 'Mist') {
    weatherIcon.src = 'images/mist.png';
  }

  // afisare apus si rasarit
  sunrise = new Date(dataFromGeo.sys.sunrise * 1000).toLocaleString();
  console.log(sunrise);
  document.querySelector('.sunrise').innerHTML = sunrise;
  sunset = new Date(dataFromGeo.sys.sunset * 1000).toLocaleString();
  console.log(sunset);
  document.querySelector('.sunset').innerHTML = sunset;

  // call checkWeather
  await checkWeather(dataFromGeo.name);
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

checkLocation();

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

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
