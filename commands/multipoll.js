const Discord = require("discord.js");
const timeoutPromise = require('util').promisify(setTimeout);
var optionA = "🇦";
var optionB = "🇧";
var optionC = "🇨";
var optionD = "🇩";
var optionE = "🇪";
var optionF = "🇫";
var optionG = "🇬";
var optionH = "🇭";
var optionI = "🇮";
var optionJ = "🇯";
var optionK = "🇱";
var optionL = "🇱";
var optionM = "🇲";
var optionN = "🇳";
var optionO = "🇴";
var optionP = "🇵";
var optionQ = "🇶";
var optionR = "🇷";
var optionS = "🇸";
var optionT = "🇹";
var pollOptions = [optionA, optionB, optionC, optionD, optionE, optionF, optionG, optionH, optionI, optionJ, optionK, optionL, optionM, optionN, optionO, optionP, optionQ, optionR, optionS, optionT];
var pollName = "";


exports.run = async (client, message, args) => {

  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Please give my role the manage messages permissions and then try again.");
  }

  if(args.length < 3) {
    return message.channel.send('Incorrect Format -- !vote seconds|minutes|hours # option 1 | option 2 ...');
  }

  var awaitLength;
  if(args[0] === 'seconds') {
    awaitLength = 1000 * args[1];
  }
  else if (args[0] === 'minutes') {
    awaitLength = (60 * args[1]) * 1000;
  }
  else if (args[0] === 'hours') {
    awaitLength = (3600 * args[1]) * 1000;
  }
  else {
    return message.channel.send('Invalid unit of time');
  }

  var argOptions = "";
  for(i = 2; i < args.length; i++) {
    if(i === args.length - 1) {
       argOptions += args[i];
     }
     else {
       argOptions += (args[i] + " ");
     }
  }

  var splitOptions = argOptions.split(" | ");

  var askForPollName = await message.channel.send("Enter a name for your poll: (c to cancel)");
  const pollCollection = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {max: 1, time: 20000})
  var pollArray = pollCollection.array();
  if(pollArray.length === 0) {
    return message.channel.send("You did not enter a name for the poll.")
  }
  var pollObject = pollArray[0];
  if(pollObject.content === "c") {
    return message.channel.send("Poll Cancelled.");
  }
  var pollMessage = `**${pollObject.content}** \n`;
  pollObject.delete();
  message.delete();
  var reactions = [];

  for(var i = 0; i < splitOptions.length; i++) {
    pollMessage += (`${pollOptions[i]} ${splitOptions[i]} \n`);
  }
  askForPollName.delete();
  var reactToThis = await message.channel.send(pollMessage);

  for(var i = 0; i < splitOptions.length; i++) {
    reactions.push(await reactToThis.react(pollOptions[i]));
  }
  try {
    await reactToThis.pin();
    await timeoutPromise(awaitLength);
    await reactToThis.unpin();
  }
  catch(err) {
    return message.channel.send("Cannot pin message, please ensure I have the proper role settings.");
  }

  var pollResults = `**POLL FINISHED** \n **${pollObject.content}** \n`;
  for(var i = 0; i < reactions.length; i++) {
    pollResults += `${pollOptions[i]} ${splitOptions[i]}: ${reactions[i].count-1} vote(s)\n`
  }
  await message.channel.send(pollResults);
  reactToThis.delete();


}
