"use strict";

const apiKey = "06dd72a81ef3c498633ad4a77177338d";
const weather = document.getElementById("weather");

function kelvin(k) {
  return Math.floor(k - 273.15);
}

async function searchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br`;

  const resp = await fetch(url, { origin: "cors" });
  const respData = await resp.json();

  if (resp.ok) {
    const inDegrees = kelvin(respData.main.temp);
    const description = respData.weather[0].description;
    const MaxInDegres = kelvin(respData.main.temp_max);
    const MinInDegres = kelvin(respData.main.temp_min);

    weather.innerHTML = `
      <h1>${city}</h1>
      <img class="icon" src="https://openweathermap.org/img/wn/${respData.weather[0].icon}@2x.png" /> 
      <h2>${inDegrees}°C </h2>
      <h3>Neste o momento o tempo está ${description}.</h3>
      <div class="max-min">
        <h3>Temperatura máxima de ${MaxInDegres}°C </h3>
        <h3>Temperatura mínima de ${MinInDegres}°C </h3>
      </div>
    `;
  } else {
    weather.innerHTML = `
      <h1>Não foi possível encotrar a cidade ${city}!</h1>
      <h3>Confira se o nome da cidade foi escrito corretamente.</h3>
    `;
  }
}

let city = document.getElementById("cidade");

function search() {
  if (city != "") {
    searchWeather(city.value);
  } else {
    weather.innerHTML = `
      <h1>Proucure sua cidade digitando o nome no campo de busca!</h1>`;
  }
  city.value = "";
}

city.addEventListener("keypress",function(e){
  var key = e.which;
  if (key === 13) {
    search();
  }
});