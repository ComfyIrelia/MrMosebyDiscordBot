const Discord = require("discord.js");
const quotes = require("./trumpquotes.json")
var personalizedArray = quotes.messages.personalized;
var non_personalizedArray = quotes.messages.non_personalized;

exports.run = (client, message, args) => {
  if(Math.floor((Math.random() * 2) + 1) === 1) {
    message.reply(personalizedArray[Math.floor((Math.random() * personalizedArray.length) + 1)]);
  }
  else {
    message.channel.send(non_personalizedArray[Math.floor((Math.random() * non_personalizedArray.length) + 1)])
  }
}
