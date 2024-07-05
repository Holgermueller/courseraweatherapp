"use strict";

let weatherBlock;
let correctedWeather;
const selectedCity = document.getElementById("citySelector");
const weatherDisplay = document.getElementById("weatherDisplay");
const proc = document.getElementById("processing");

const showDate = () => {
  let DateTime = luxon.DateTime.toLocaleString();
};

showDate();

async function createSelector() {
  await fetch("../city_coordinates.csv")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      let result = [];
      let lines = data.split("\n");
      let headers = lines[0].split(",");

      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
      }
      for (let i = 0; i < result.length; i++) {
        const selector = document.getElementById("citySelector");
        let opt = document.createElement("option");
        opt.setAttribute("id", result[i].city);
        opt.setAttribute("data-lat", result[i].latitude);
        opt.setAttribute("data-long", result[i].longitude);
        opt.setAttribute("value", result[i].city);

        opt.innerHTML = result[i].city + ", " + result[i].country;
        selector.appendChild(opt);
      }
    });
}

selectedCity.onchange = function (event) {
  showProcessing();

  if (weatherBlock) {
    resetWeatherDisplay();
  }

  setTimeout(() => {
    getTheWeather(event);

    hideProcessing();
  }, 3000);
};

const getTheWeather = (event) => {
  let latitude = event.target.options[event.target.selectedIndex].dataset.lat;
  let longitude = event.target.options[event.target.selectedIndex].dataset.long;

  fetch(
    "http://www.7timer.info/bin/api.pl?lon=" +
      longitude +
      "&lat=" +
      latitude +
      "&product=civillight&output=json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let allData = data.dataseries;
      allData.forEach((datum) => {
        const dateDisplay = document.createElement("p");
        dateDisplay.classList.add("date");
        let dateToDisplay = datum.date;
        dateDisplay.innerHTML = dateToDisplay;

        const iconDisplay = document.createElement("img");
        iconDisplay.classList.add("icon-display");

        const singleWeatherDisplay = document.createElement("p");
        singleWeatherDisplay.classList.add("weather");
        let weather = datum.weather;

        if (weather === "ishower") {
          correctedWeather = "Isolated Showers";
        } else if (weather === "lightrain") {
          correctedWeather = "Light Rain";
        } else if (weather === "lightsnow") {
          correctedWeather = "Light Snow";
        } else if (weather === "mcloudy") {
          correctedWeather = "Mostly Cloudy";
        } else if (weather === "oshower") {
          correctedWeather = "Occassional Showers";
        } else if (weather === "pcloudy") {
          correctedWeather = "Partly Cloudy";
        } else if (weather === "rainshow") {
          correctedWeather = "Mix of Rain and Snow";
        } else if (weather === "tsrain") {
          correctedWeather = "Thunderstorms Possible";
        } else if (weather === "tstorm") {
          correctedWeather = "Thunderstorms";
        } else {
          correctedWeather = weather.charAt(0).toUpperCase() + weather.slice(1);
        }

        singleWeatherDisplay.innerHTML = correctedWeather;

        if (weather === "clear") {
          iconDisplay.src = "./images/clear.png";
        }

        if (weather === "cloudy") {
          iconDisplay.src = "./images/cloudy.png";
        }

        if (weather === "fog") {
          iconDisplay.src = "./images/fog.png";
        }

        if (weather === "humid") {
          iconDisplay.src = "./images/humid.png";
        }

        if (weather === "ishower") {
          iconDisplay.src = "./images/ishower.png";
        }

        if (weather === "lightrain") {
          iconDisplay.src = "./images/lightrain.png";
        }

        if (weather === "lightsnow") {
          iconDisplay.src = "./images/lightsnow.png";
        }

        if (weather === "mcloudy") {
          iconDisplay.src = "./images/mcloudy.png";
        }

        if (weather === "oshower") {
          iconDisplay.src = "./images/oshower.png";
        }

        if (weather === "pcloudy") {
          iconDisplay.src = "./images/pcloudy.png";
        }

        if (weather === "rain") {
          iconDisplay.src = "./images/rain.png";
        }

        if (weather === "rainsnow") {
          iconDisplay.src = "./images/rainsnow.png";
        }

        if (weather === "snow") {
          iconDisplay.src = "./images/snow.png";
        }

        if (weather === "tsrain") {
          iconDisplay.src = "./images/tsrain.png";
        }

        if (weather === "tstorm") {
          iconDisplay.src = "./images/tstorm.png";
        }

        if (weather === "windy") {
          iconDisplay.src = "./images/windy.png";
        }

        const tempDisplay = document.createElement("p");
        tempDisplay.classList.add("temps");

        let maxTemp = datum.temp2m.max;
        let minTemp = datum.temp2m.min;

        tempDisplay.innerHTML =
          "H: " + maxTemp + "&deg;C/L: " + minTemp + "&deg;C";

        let maxFahreneheit = (maxTemp * 9) / 5 + 32;
        let minFahrenheit = (minTemp * 9) / 5 + 32;

        const fahrenheitDisplay = document.createElement("p");
        fahrenheitDisplay.classList.add("fahrenheits");

        fahrenheitDisplay.innerHTML =
          "H: " + maxFahreneheit + "&deg;F/L: " + minFahrenheit + "&deg;F";

        weatherBlock = document.createElement("div");
        weatherBlock.classList.add("weather-block");
        weatherBlock.appendChild(dateDisplay);
        weatherBlock.appendChild(iconDisplay);
        weatherBlock.appendChild(singleWeatherDisplay);
        weatherBlock.appendChild(tempDisplay);
        weatherBlock.appendChild(fahrenheitDisplay);

        weatherDisplay.appendChild(weatherBlock);
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};

const resetWeatherDisplay = () => {
  if (weatherBlock) weatherDisplay.innerHTML = "";
};

const showProcessing = () => {
  proc.style.display = "block";
};

const hideProcessing = () => {
  proc.style.display = "none";
};

const seeF = () => {
  let cTempsToDisplay = document.getElementsByClassName("temps");
  for (let i = 0; i < cTempsToDisplay.length; i++) {
    cTempsToDisplay[i].style.display = "none";
  }

  let fTempsToDisplay = document.getElementsByClassName("fahrenheits");
  for (let i = 0; i < fTempsToDisplay.length; i++) {
    fTempsToDisplay[i].style.display = "block";
  }
};

const seeC = () => {
  let cTempsToDisplay = document.getElementsByClassName("temps");
  for (let i = 0; i < cTempsToDisplay.length; i++) {
    cTempsToDisplay[i].style.display = "block";
  }

  let fTempsToDisplay = document.getElementsByClassName("fahrenheits");
  for (let i = 0; i < fTempsToDisplay.length; i++) {
    fTempsToDisplay[i].style.display = "none";
  }
};

hideProcessing();
createSelector();
