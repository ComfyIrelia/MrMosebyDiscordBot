const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
var users = [];

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./commands/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
  client.user.setActivity("You", {type: "WATCHING"});
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.guild) {
    }
      var user = new userObject(message.author.id, message.guild.id);
      users.push(user);
  }
  if(message.content.indexOf(botconfig.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    return;
  }
});

client.login(botconfig.token);
