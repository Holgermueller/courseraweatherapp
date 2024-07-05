"use strict";

let weatherBlock;
const selectedCity = document.getElementById("citySelector");
const weatherDisplay = document.getElementById("weatherDisplay");
const proc = document.getElementById("processing");

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
      console.log(data.dataseries);

      let allData = data.dataseries;
      allData.forEach((datum) => {
        let dateDisplay = document.createElement("p");
        const formattedDate = new Date("MMM DD YYYY");
        dateDisplay.classList.add("date");
        dateDisplay.innerHTML = datum.date;

        let iconDisplay = document.createElement("img");
        iconDisplay.classList.add("icon-display");

        let singleWeatherDisplay = document.createElement("p");
        singleWeatherDisplay.classList.add("weather");
        let weather = datum.weather;

        let correctedWeather;
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

        let tempDisplay = document.createElement("p");
        tempDisplay.classList.add("temps");
        tempDisplay.innerHTML =
          "H: " + datum.temp2m.max + "&deg;C/L: " + datum.temp2m.min + "&deg;C";

        weatherBlock = document.createElement("div");
        weatherBlock.classList.add("weather-block");
        weatherBlock.appendChild(dateDisplay);
        weatherBlock.appendChild(iconDisplay);
        weatherBlock.appendChild(singleWeatherDisplay);
        weatherBlock.appendChild(tempDisplay);

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

hideProcessing();
createSelector();
