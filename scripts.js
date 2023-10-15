const apiKey = "729cb00b630509cc9ee314288553cebd";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let city = "London";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
let icon = document.querySelector(".weather-pic");

function updatePicture(weather) {
  console.log(weather);
  if (weather == "Clouds") {
    icon.src = "img/clouds.png";
  } else if (weather == "Clear") {
    icon.src = "img/clear.png";
  } else if (weather == "Drizzle") {
    icon.src = "img/drizzle.png";
  } else if (weather == "Rain") {
    icon.src = "img/rain.png";
  } else if (weather == "Mist") {
    icon.src = "img/mist.png";
  } else if (weather == "Snow") {
    icon.src = "img/snow.png";
  }
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + `&q=${city}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".wind").innerHTML = data.wind.speed + ` km/h`;
    document.querySelector(".hum").innerHTML = data.main.humidity + `%`;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + `°C`;
    updatePicture(data.weather[0].main);
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
