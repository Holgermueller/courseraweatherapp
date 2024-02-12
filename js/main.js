"use strict";
const fs = require("fs");
const csvFile = fs.readFileSync("./city_coordinates.csv");
const arr = csvFile.toString().split("\n");
// console.log(arr);
let jsonObject = [];
let headers = arr[0].split(",");
// console.log(headers);
for (let i = 1; i < arr.length; i++) {
  let data = arr[i].split(",");
  let object = {};
  console.log(data);
  for (let j = 0; j < data.length; j++) {
    object[headers[j].trim()] = data[j].trim();
  }
  jsonObject.push(object);
}
console.log(JSON.stringify(jsonObject));
