const API_KEY = "9df3465a846a3f853f168149173fd2ec";
const weatherContainer = document.querySelector("#weather");

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const [weather, city] = weatherContainer.querySelectorAll("span");
      weather.textContent = `${data.weather[0].main} / ${data.main.temp}°C`;
      city.textContent = data.name;
    });
}

function onGeoError() {
  alert("Can't find location.");
}
