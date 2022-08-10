function displayTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = (document.querySelector("#city").innerHTML =
    response.data.name);
  let currentDescription = (document.querySelector(
    "#weather-description"
  ).innerHTML = response.data.weather[0].description);
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "c6250be52ad7bd4f277e12656c8e390e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Cracow&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

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
