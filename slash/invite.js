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
    interaction.reply({ embeds: [datadone], components: [await require('../interactions').link(client.color.boti, 'Invite Me!'), await require('../interactions').link(client.color.invite, 'Support Server')] })
  }
}