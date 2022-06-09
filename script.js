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

getCityWeather("Sydney");

document.querySelector("#search-form").addEventListener("submit", search);

function showWeather(response) {
  console.log(response.data);
  console.log(response.data.name);
  let cityHeader = document.querySelector("#currentCity");
  cityHeader.innerHTML = response.data.name;
  let cityTemperature = document.querySelector("#temp");
  cityTemperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let cityTempMin = document.querySelector("#tempMin");
  cityTempMin = Math.round(response.data.main.temp.temp_min);
  let cityTempMax = document.querySelector("#tempMax");
  cityTempMax = Math.round(response.data.main.temp.temp_max);
}

//========================== ICON CHANGE =======================================================//

//=========================== UNIT CONVERSION =================================================//

document
  .querySelector("#farenheit")
  .addEventListener("click", convertToFarenheit);

function convertToFarenheit() {
  let celciusTemp = document.querySelector("#temp".value);
  console.log(celciusTemp);
}

//console.log(apiUrl);

//============================== GET CURRENT LOCATION ==============================================//

document
  .querySelector("#currentLocation")
  .addEventListener("click", retrievePosition);

//function showLocationWeather() {
//let apiKey = "51a8ffee2e435fe855f1dad6b24620d1";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
//axios.get(apiUrl).then(displayWeatherCondition);
//}

function retrievePosition(position) {
  let apiKey = "51a8ffee2e435fe855f1dad6b24620d1";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
//============================= BACKGROUND CHANGE ==================================================//
