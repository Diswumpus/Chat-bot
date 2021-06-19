const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "invite",
  description: "Remove your data!",
  async execute(client, interaction) {
    const datadone = new Discord.MessageEmbed()
    .setTitle(`\`🔗\` Invite`)
    .setURL(client.color.boti)
    .setColor(client.color.color)
    interaction.reply(datadone)

  }
}