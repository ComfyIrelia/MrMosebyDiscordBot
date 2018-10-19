const Discord = require("discord.js");
const timeoutPromise = require('util').promisify(setTimeout);
var agree = "✅";
var disagree = "❌";


exports.run = async (client, message, args) => {
  let botMessage = await message.channel.send('Vote!');

  const agreeReaction = await botMessage.react(agree);
  const disagreeReaction = await botMessage.react(disagree);
  await timeoutPromise(5000);

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
