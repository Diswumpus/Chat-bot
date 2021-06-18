const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);
const msgg = require('../models/message')

module.exports = {
  name: "removed",
  description: "Remove your data!",
  async execute(message, Member, args) {
    msgg.deleteMany({ user: message.author.id })
    const datadone = new Discord.MessageEmbed()
    .setTitle('Done!')
    .setDescription(`I have deleted all your data from my database! __**This could take some time**__`)
    .setColor('GREEN')
    message.reply(datadone)

  }
}