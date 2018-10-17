const Discord = require("discord.js");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
const urlAPI = 'https://icanhazdadjoke.com/'

exports.run = (client, message, args) => {

  $.getJSON(urlAPI, function(response){
    message.channel.send(response.joke);
  })
}
