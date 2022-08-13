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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Su.", "Mo.", "Tu.", "We.", "Th.", "Fr.", "Sa."];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = ["Su.", "Mo.", "Tu.", "We.", "Th.", "Fr.", "Sa."];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2 first-card">
              <div class="date">${formatDay(forecastDay.dt)} ${new Date(
          forecastDay.dt * 1000
        ).toLocaleString("en-GB", {
          month: "short",
          day: "numeric",
        })}</div>
              <img
                src="images/${forecastDay.weather[0].icon}.png"
                alt=""
                width="40px"
                id="forecast-icon"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-max"> ${Math.round(
                  forecastDay.temp.max
                )}º</span>|
                <span class="weather-forecast-min">${Math.round(
                  forecastDay.temp.min
                )}º</span>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9d31414c22ffca4900ff3577366ff9fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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

  let weatherIcon = response.data.weather[0].icon;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `images/${weatherIcon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "9d31414c22ffca4900ff3577366ff9fc";

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
