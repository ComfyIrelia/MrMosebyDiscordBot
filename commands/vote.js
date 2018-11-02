const Discord = require("discord.js");
const timeoutPromise = require('util').promisify(setTimeout);
var agree = "✅";
var disagree = "❌";


exports.run = async (client, message, args) => {

  console.log(args.length);
  if(args.length !== 2) {
    return message.channel.send('Incorrect Format -- !vote seconds|minutes|hours #');
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

    let botMessage = await message.channel.send('Vote!');

    const agreeReaction = await botMessage.react(agree);
    const disagreeReaction = await botMessage.react(disagree);

    botMessage.pin();
    await timeoutPromise(awaitLength);
    botMessage.unpin();
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


}
