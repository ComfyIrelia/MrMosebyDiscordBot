const Discord = require("discord.js");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
const api_key = '&appid=59e8cd4a97d580c08103d85d2a342afb';
const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_units = '&units=imperial';
var city = "";

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

  var url = api_url + city + api_key + api_units;
  $.getJSON(url, function(response){

    if(!response) {
       message.channel.send(`**Cannot find data for that city**`);
    }
    else {
      var windDegree = response.wind.deg;
      var windDirection;
      if(windDegree > 336) {
        windDirection = "N";
      }
      else if(windDegree > 291) {
        windDirection = "NW";
      }
      else if(windDegree > 246) {
        windDirection = "W";
      }
      else if(windDegree > 201) {
        windDirection = "SW";
      }
      else if(windDegree > 156) {
        windDirection = "S";
      }
      else if(windDegree > 112) {
        windDirection = "SE";
      }
      else if(windDegree > 66) {
      windDirection = "E";
      }
      else if (windDegree > 22) {
        windDirection = "NE"
      }
      else if (windDegree === undefined) {
        windDirection = "";
      }
      else {
        windDirection = "N";
      }


      var tempF = response.main.temp.toFixed(0);
      var tempC = ((5/9) * (tempF - 32)).toFixed(0);
      message.channel.send(`**Weather for ${response.name}, ${response.sys.country}**\n**Weather:** ${response.weather[0].description}\n**Temp:** ${tempF}°F / ${tempC}°C **Wind:** ${response.wind.speed.toFixed(0)}mph ${windDirection}\n**Humidity:** ${response.main.humidity}%`);
      // message.channel.send(`**Weather:** ${response.weather[0].description}`);
      // message.channel.send(`**Temp:** ${tempF}°F / ${tempC}°C **Wind:** ${response.wind.speed.toFixed(0)}mph ${windDirection}`);
      // message.channel.send(`**Humidity:** ${response.main.humidity}%`);
    }


  });
  city = "";
}
