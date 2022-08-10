function displayTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  let currentCity = (document.querySelector("#city").innerHTML =
    response.data.name);

  let currentDescription = (document.querySelector(
    "#weather-description"
  ).innerHTML = response.data.weather[0].description);

  let windElement = (document.querySelector("#wind-value").innerHTML =
    Math.round(response.data.wind.speed) + " km/h");

  let pressureElement = (document.querySelector("#pressure-value").innerHTML =
    response.data.main.pressure + " hPa");

  let feelsElement = (document.querySelector("#feels-temp").innerHTML =
    Math.round(response.data.main.feels_like) + " ℃");

  let humidityElement = (document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity + " %");

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayCurrentDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  let day = days[date.getDay()];
  let todayDate = date.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = months[date.getMonth()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let displayDate = document.querySelector("#current-date");
  displayDate.innerHTML = `${hour}:${minute} ${day}, ${todayDate} ${month}`;
}
displayCurrentDate();

function searchCity(city) {
  let apiKey = "c6250be52ad7bd4f277e12656c8e390e";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

function convertToCelsius(event) {
  event.preventDefault();

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

searchCity("Krakow");
