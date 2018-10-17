const agree = "✅";
const disagree = "❌";

exports.run = async (client, message, args) => {
  let msg = await message.channel.send("Was this meme spicy or not? You decide!");
  await msg.react(agree);
  await msg.react(disagree);

  const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 15000});
  message.channel.send(`Voting Complete! \n\n${agree}: ${reactions.get(agree).count-1}\n${disagree}: ${reactions.get(disagree).count-1}`);
}
