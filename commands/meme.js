const Discord = require("discord.js");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
var url = "https://api.imgflip.com/get_memes";

exports.run = (client, message, args) => {

  var randomNum = Math.floor((Math.random() * 100) + 1);

  $.getJSON(url, function(response){
    var urlAPI = response.data.memes[randomNum].url;
    console.log(urlAPI);
    message.channel.send({file: urlAPI});
  })

}
