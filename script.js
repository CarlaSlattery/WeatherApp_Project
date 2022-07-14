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

todaysDate.innerHTML = `${hours}:${minutes} ${day} ${date} ${month} ${year}`;

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

//function calcDay(timestamp) {
//  let updatedDay = new updatedDay(timestamp * 1000);
//  let weekday = updatedDay.getDay();
//  let weekdayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//  return weekdayArray(weekday);
//}

function showForecast(response) {
  console.log(response.data.daily);
  let newForecast = response.data.daily;
  // let forecastData = response.data.daily;
  let forecastSection = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  let forecastImage =
    //let day = ["Thu", "Fri", "Sat"];
    newForecast.forEach(function (forecastDay) {
      forecastHTML += `
            <div class="col dayForecast">
              <span class="day" id="forecastDay">${forecastDay.dt}</span>
             <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" />
              <span class="forecast-temp" id="forecastTempC">${forecastDay.temp.day}˚</span
              ><span class="forecast-desc" id="forecastDesc">${forecastDay.weather[0].description}</span>
            </div>`;
    });

  forecastHTML = forecastHTML + `</div>`;
  forecastSection.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "51a8ffee2e435fe855f1dad6b24620d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function displayCurrentTemp(response) {
  console.log(response.data);
  let city = document.querySelector("#placeName");
  let currentTemp = document.querySelector("#currentTemp");
  let weatherDescription = document.querySelector("#weatherDescription");
  let iconCurrent = document.querySelector("#currentWeatherIcon");
  let humidity = document.querySelector("#humidity");
  celciusTemp = response.data.main.temp;
  let windSpeed = document.querySelector("#windSpeed");

  city.innerHTML = response.data.name;
  currentTemp.innerHTML = Math.round(celciusTemp);
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconCurrent.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconCurrent.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let searchCity = document.querySelector("#searchEngine");
searchCity.addEventListener("submit", getCityRequest);

//=============================== UNIT CONVERSION ============================================//

function convertFarenheit(event) {
  event.preventDefault();
  let tempFar = Math.round(celciusTemp * 9) / 5 + 32;
  let currentTempF = document.querySelector("#currentTemp");
  currentTempF.innerHTML = tempFar;
}

let celciusTemp = null;

function convertCelcius(event) {
  event.preventDefault();
  let currentTempC = document.querySelector("#currentTemp");
  currentTempC.innerHTML = Math.round(celciusTemp);
}

let farenheitLink = document
  .querySelector("#unitFar")
  .addEventListener("click", convertFarenheit);
let celciusLink = document
  .querySelector("#unitCel")
  .addEventListener("click", convertCelcius);
