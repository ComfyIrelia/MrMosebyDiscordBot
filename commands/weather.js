const Discord = require("discord.js");
var getJSON = require('get-json')
const api_key = '&appid=59e8cd4a97d580c08103d85d2a342afb';
const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_F = '&units=imperial';
const api_C = '&units=metric'
var city = "";
var weatherF;
var weatherC;

exports.run = (client, message, args) => {
  var i;
  for(i = 0; i < args.length; i++) {
    if(i === args.length - 1) {
       city += args[i];
     }
     else {
       city += (args[i] + " ");
     }
  }

  var urlF = api_url + city + api_key + api_F;
  var urlC = api_url + city + api_key + api_C;
  console.log(urlF);
  console.log(urlC);

  var temp;
  getJSON(urlF, function(error, response){

    //console.log(error);
    //undefined
    temp = response.main.temp;
    // ["Beth Orton &mdash; Stolen Car",
    // "Jack White &mdash; Temporary Ground",
    // "I Am Kloot &mdash; Loch",
    // "Portishead &mdash; Glory Box"]
  });
  console.log(temp);

  // if (weatherF) {
  //   console.log(weatherF.main.temp);
  //   //message.channel.send(`Weather in ${city}:\n ${weatherF.main.temp} F\n ${weatherC.main.temp}`);
  // }
  city = "";
}
