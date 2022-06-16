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

// =================== WEATHER SEARCH ===========================================//

function searchEngine(city) {
  let apiKey = "51a8ffee2e435fe855f1dad6b24620d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayCurrentTemp);
}

function getCityRequest(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#cityInput");
  console.log(citySearch.value);
  searchEngine(citySearch.value);
}

function displayCurrentTemp(response) {
  console.log(response.data);
  let city = document.querySelector("#placeName");
  let currentTemp = document.querySelector("#currentTemp");
  let weatherDescription = document.querySelector("#weatherDescription");
  let iconCurrent = document.querySelector("#currentWeatherIcon");
  city.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innertext = Math.round(response.data.wind.speed);
  iconCurrent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconCurrent.setAttribute("alt", response.data.weather[0].description);
}

searchEngine("stoke");

let searchCity = document.querySelector("#searchEngine");
searchCity.addEventListener("submit", getCityRequest);
