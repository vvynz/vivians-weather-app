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
  document.querySelector("#user-display-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
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

inputCity("Toronto");
