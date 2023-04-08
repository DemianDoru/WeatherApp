const apiKey = '01bab4749d8f4bd18dee1c13d1dc32e6';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// const apiUrlForecast =
//   'https://api.openweathermap.org/data/2.5/forecast?lat=52.5244&lon=13.4105&units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  const response = await fetch(
    apiUrl  + city + `&appid=${apiKey}`
  );
  var data = await response.json();

  console.log(data);
  document.querySelector('.city-name').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.humidity').innerHTML = data.main.humidity + ' %';
  document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
  document.querySelector('.temp-res').innerHTML = data.main.feels_like;
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
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});


