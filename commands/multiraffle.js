const Discord = require("discord.js");
const timeoutPromise = require('util').promisify(setTimeout);
var raffle = "🎫";

exports.run = async (client, message, args) => {
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send("Please give me the role to manage messages");
  }
  if(args.length != 1) {
    return message.channel.send('Incorrect format -- !multiraffle # of points');
  }
  else {
    var awaitLength = 10000;
    var points = args[0];
    let botMessage = await message.channel.send(`Multiraffle of **${points}** started! React to join, 2 minutes remaining!`);

    const raffleReaction = await botMessage.react(raffle);

    try {

      const filter = (reaction, user) => {
        return [raffle].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          if(reaction.emoji.name === raffle) {
            message.reply(`You reacted!`)
          }
        })
    }
    catch(err) {
      return message.channel.send("Doesn't have manage message permission.");
    }
    message.channel.send(`Raffle finished!`);
    console.log(raffleReaction.users);
  }

}
