const Discord = require("discord.js");

exports.run = (client, message, args) => {
    message.reply("pong!").catch(console.error);
}
