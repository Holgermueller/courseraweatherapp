"use strict";

// Convert CSV to JSON
async function createSelector() {
  const file = await fetch("../city_coordinates.csv")
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
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        let selector = document.getElementById("citySelector");
        let opt = document.createElement("option");
        console.log(opt);
        opt.innerHTML = result[i].city + ", " + result[i].country;
        selector.appendChild(opt);
      }
    });
}

createSelector();
