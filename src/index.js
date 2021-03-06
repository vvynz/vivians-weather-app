function currentTime(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let today = new Date();
  let day = days[today.getDay()];
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = `${day} ${hours}:${minutes}`;

  return currentDate;
}
let currentDate = document.querySelector("#today-date");
currentDate.innerHTML = currentTime();

function inputCity(city) {
  let apiKey = "1f485c022e4af72c068b4973496c26cc";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let feelsLikeElement = Math.round(response.data.main.feels_like);
  let iconElement = document.querySelector("#weather-icon");
  let windElement = Math.round(response.data.wind.speed);

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#user-display-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    celsiusTemperature
  )}`;
  document.querySelector(
    "#temp-feel-like"
  ).innerHTML = `Feels like ${feelsLikeElement}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#windSpeed").innerHTML = `Wind: ${windElement} km/h`;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "1f485c022e4af72c068b4973496c26cc";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="50"/>
      <div class="forecast-temperature"> ${Math.round(
        forecastDay.temp.day
      )} °C</div>
      <div class ="forecast-description"><small>${
        forecastDay.weather[0].description
      }</small></div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function userSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#example-city").value;
  inputCity(city);
}

function showLocation(position) {
  let apiKey = "1f485c022e4af72c068b4973496c26cc";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let searchForm = document.querySelector("#search-btn");
searchForm.addEventListener("click", userSubmit);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

inputCity("Toronto");
