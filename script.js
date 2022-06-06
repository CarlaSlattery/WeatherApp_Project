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
}
