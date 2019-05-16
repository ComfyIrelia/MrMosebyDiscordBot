const Discord = require("discord.js");
const userPoints = require("./userpoints.json");
var users = [];

function userObject(uid, gid) {
  this.userID = uid;
  this.guildID = gid;
  this.points = 0;
}

userObject.getUID = function () {
  return this.userID;
}

userObject.getGID = function () {
  return this.guildID;
}

userObject.addPoint = function () {
  this.points++;
}
exports.run = (client, message, args) => {
  //var uid = user that sent message id
  //var gid = users guild that message was sent from
  var doesUserExist = function(uid, gid) {
    var allUsers = userPoints.users;
    for(var i = 0; i < userPoints.users.length; i++) {
      if(allUsers[i].getUID == uid && allusers[i].guildID == gid) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  if (doesUserExist) {

  }
  else {

  }
}

exports.add = (messageID, guildID) => {

}
