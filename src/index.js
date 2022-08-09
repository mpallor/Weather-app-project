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
