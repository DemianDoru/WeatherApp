// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(pos) {
//   const crd = pos.coords;

//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

////////////////////////////////////////////

///////////////////////////////////////////

// Get user's current location
// navigator.geolocation.getCurrentPosition(function (position) {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;

//   // Make request to weather API using latitude and longitude
//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       // Do something with the weather data
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

'http://api.openweathermap.org/geo/1.0/reverse?lat=47.0667&lon=21.9333&limit={limit}&appid=01bab4749d8f4bd18dee1c13d1dc32e6';
