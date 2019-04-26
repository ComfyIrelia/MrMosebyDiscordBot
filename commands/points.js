const Discord = require("discord.js");
var users = [];

function userObject(uid, gid) {
  this.userID = uid;
  this.guildID = gid;
  this.points = 0;
}

userObject.getUID = function() {
  return this.userID;
}

userObject.getGID = function () {
  return this.guildID;
}

exports.run = (client, message, args) => {
  //Return the users points
}

exports.add = (userID, guildID) => {
  //When a user types a message this is invoked adding a point to the user in the specific server.
  //A users points won't share across all their servers with this bot.
}
