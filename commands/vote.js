const Discord = require("discord.js");
const timeoutPromise = require('util').promisify(setTimeout);
var agree = "✅";
var disagree = "❌";
var pollName = "";


exports.run = async (client, message, args) => {

  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Please give my role the manage messages permissions and then try again.");
  }

  for(i = 2; i < args.length; i++) {
    if(i === args.length - 1) {
       pollName += args[i];
     }
     else {
       pollName += (args[i] + " ");
     }
  }

  if(args.length < 3) {
    return message.channel.send('Incorrect Format -- !vote seconds|minutes|hours # name of poll');
  }
  else {

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

    let botMessage = await message.channel.send(`Vote! **${pollName}**`);

    const agreeReaction = await botMessage.react(agree);
    const disagreeReaction = await botMessage.react(disagree);

    try {
      botMessage.pin();
      await timeoutPromise(awaitLength);
      botMessage.unpin();
    }
    catch(err) {
      return message.channel.send("Doesn't have manage message ability, please give me a role that does!");
    }
    message.channel.send(`Voting Finished! \n\n${agree}: ${(agreeReaction.count)-1}\n${disagree}: ${(disagreeReaction.count)-1}`);

    if(agreeReaction.count > disagreeReaction.count) {
      message.channel.send('The people have voted yes.');
    }
    else if (agreeReaction.count === disagreeReaction.count) {
      message.channel.send('The people are undecided.');
    }
    else {
      message.channel.send('The people have voted no.');
    }
  }

  pollName = "";
}
