const Discord = require("discord.js");
const api_key = '59e8cd4a97d580c08103d85d2a342afb';
const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_F = '&units=imperial';
const api_C = '&units=metric'
var weatherF;
var weatherC;

exports.run = (client, message, args) => {
  loadJSON(url, gotData);

  function gotData(data) {
    //weatherF = ??
    //weatherC = ??
  }

  if (weatherF and weatherC) {

  }
}
