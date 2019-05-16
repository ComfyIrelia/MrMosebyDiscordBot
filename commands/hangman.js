const Discord = require("discord.js");
var keyword = "";
var keywordArray = [];
var hangman = [`\`\`\`
/
|
|
|
|
|
\-------
\`\`\``,`\`\`\`
/---|
|
|
|
|
|
\-------\`\`\``,`\`\`\`
/---|
|   o
|
|
|
|
\-------\`\`\``, `\`\`\`
/---|
|   o
|   |
|   |
|
|
\-------\`\`\``,`\`\`\`
/---|
|   o
|  \\|
|   |
|
|
\-------\`\`\``, `\`\`\`
/---|
|   o
|  \\|/
|   |
|
|
\-------\`\`\``,`\`\`\`
/---|
|   o
|  \\|/
|   |
|  /
|
\-------\`\`\``,`\`\`\`
/---|
|   o
|  \\|/
|   |
|  / \\
|
\-------\`\`\``];

exports.run = async (client, message, args) => {

  /**for(var i = 0; i < hangman.length; i++) {
    message.channel.send(hangman[i]);
  }**/
  message.channel.send(args[0]);
  for(i = 0; i < args.length; i++) {
    if(i === args.length - 1) {
       keyword += args[i];
     }
     else {
       keyword += (args[i] + " ");
     }
   }
  message.channel.send(keyword);
  keywordArray = keyword.split("");
  for(var i = 0; i < keywordArray.length; i++) {
    message.channel.send(keywordArray[i] + "\n");
  }

}
