  const forecastResponse = await fetch(
    `${otherApi}?q=${city}&units=metrics&appid=${apiKey}`
  );
  const forecastData = await forecastResponse.json();

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
    if (currentDay === checkDay(i)) {
      // determine if the current hour has already passed
      const currentHourPassed =
        today.getHours() >= new Date(forecastData.list[i].dt_txt).getHours();
      if (currentHourPassed) {
        // skip the current hour as it has already passed
        continue;
      }
    }
    hourlyForecast.push({
      date: new Date(forecastData.list[i].dt_txt),
      temperature: Math.round(forecastData.list[i].main.temp - 273.15),
      iconUrl:
        'https://openweathermap.org/img/wn/' +
        forecastData.list[i].weather[0].icon +
        '.png',
    });
  }

  for (let i = 0; i < hourlyForecast.length; i++) {
    document.getElementById('hour' + (i + 1)).innerHTML =
      'Ora/Data: ' + hourlyForecast[i].date.toLocaleString();
    document.getElementById('temp' + (i + 1)).innerHTML =
      hourlyForecast[i].temperature + '°C';
    document.querySelector('.img-hour' + (i + 1)).src =
      hourlyForecast[i].iconUrl;
    document.getElementById('hour' + (i + 1)).innerHTML = hourToString(
      hourlyForecast[i].date
    );
  }
}

function checkDay(day) {
  const today = new Date();
  const todayDay = today.getDay();
  return (day + todayDay) % 7;
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
