//=================Date & Time================================//

let now = new Date();

let todaysDate = document.querySelector("#dateTime");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

todaysDate.innerHTML = `${day}, ${date} ${month} ${year} at ${hours}:${minutes}`;

//================== SHOW SEARCHED WEATHER =========================//

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  getCityWeather(cityInput.value);
  console.log(cityInput.value);
}

function getCityWeather(city) {
  let apiKey = "51a8ffee2e435fe855f1dad6b24620d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
document.querySelector("#search-form").addEventListener("submit", search);

function showWeather(response) {
  console.log(response.data);
  console.log(response.data.name);
  console.log(response.data.weather[0].icon);
  let cityHeader = document.querySelector("#currentCity");
  let cityTemperature = document.querySelector("#temp");
  let currentWeatherIcon = document.querySelector("#weatherIcon");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#windSpeed");
  let humidity = document.querySelector("#humidity");

  cityHeader.innerHTML = response.data.name;
  cityTemperature.innerHTML = Math.round(response.data.main.temp);
  currentWeatherIcon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  description.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  //let cityTempMin = document.querySelector("#tempMin");
  //cityTempMin = Math.round(response.data.main.temp.temp_min);
  //let cityTempMax = document.querySelector("#tempMax");
  //cityTempMax = Math.round(response.data.main.temp.temp_max);
}

//=========================== UNIT CONVERSION =================================================//

document.querySelector("#farenheit").addEventListener("click", changeToCelcius);

document.querySelector("#celcius").addEventListener("click", changeToFarenheit);

function changeToFarenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let farenheit = (response.data.main.temp * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(farenheit)}°F`;
}

function changeToCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = response.data.main.temp;
}

let celsiusTemp = null;

//============================== GET CURRENT LOCATION ==============================================//

document
  .querySelector("#currentLocation")
  .addEventListener("click", retrievePosition);

function showLocationWeather(response) {
  console.log(response.data);
}

function retrievePosition(position) {
  let apiKey = "51a8ffee2e435fe855f1dad6b24620d1";
  let lat = position.coords.lat;
  let lon = position.coords.lon;
  //console.log(lat);
  //console.log(lon);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocationWeather);
  showWeather();
}

navigator.geolocation.getCurrentPosition(retrievePosition);
//============================= BACKGROUND CHANGE ==================================================//
