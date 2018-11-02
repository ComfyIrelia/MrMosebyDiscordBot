const Discord = require("discord.js");

//example string
//!choose option 1 | option 2 | option 3

exports.run = (client, message, args) => {
  var command = "";
  var array = [];
  var i;
  for(i = 0; i < args.length; i++) {
    if(i === args.length - 1) {
       command += args[i];
     }
     else {
       command += (args[i] + " ");
     }
   }
   var arrayChoices = command.split(" | ");
   var randomIndex = Math.floor(Math.random() * arrayChoices.length);
   message.channel.send(`**${arrayChoices[randomIndex]}**`);
}
