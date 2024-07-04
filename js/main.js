"use strict";

// Convert CSV to JSON
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
        let selector = document.getElementById("citySelector");
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

let selectedCity = document.getElementById("citySelector");

selectedCity.onchange = function (event) {
  let latitude = event.target.options[event.target.selectedIndex].dataset.lat;
  let longitude = event.target.options[event.target.selectedIndex].dataset.long;
  console.log(event.target.options[event.target.selectedIndex].dataset.lat);
};

createSelector();
