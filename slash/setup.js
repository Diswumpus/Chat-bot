const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "setup",
  description: "Setup the server!",
  async execute(client, interaction) {
      if(!interaction.guild.me.permissions.has('MANAGE_CHANNELS')){
          return message.reply('I don\'t have permissions')
      }
    if(interaction.guild.me.permissions.has('MANAGE_CHANNELS') && interaction.member.permissions.has('ADMINISTRATOR')){
    const ch = await interaction.guild.channels.create('bp', { //Create a channel
        type: 'text' //Make sure the channel is a text channel
    });
    const yesembed = new Discord.MessageEmbed()
    .setTitle('Created!')
    .addField('Channel:', `▶ ${ch}`, true)
    .addField('ID:', `▶ ${ch.id}`, true)
    .setColor(client.color.color)
    await interaction.reply(yesembed)
}

  }
}