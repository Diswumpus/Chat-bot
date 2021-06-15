const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "setup",
  description: "Setup the server!",
  async execute(message, Member, args) {
      if(!message.guild.me.permissions.has('MANAGE_CHANNELS')){
          return message.reply('I don\'t have permissions')
      }
    if(message.guild.me.permissions.has('MANAGE_CHANNELS') && message.member.permissions.has('ADMINISTRATOR')){
    const ch = await message.guild.channels.create('bp', { //Create a channel
        type: 'text' //Make sure the channel is a text channel
    });
    const yesembed = new Discord.MessageEmbed()
    .setTitle('Created!')
    .addField('Channel:', `▶ ${ch}`, true)
    .addField('ID:', `▶ ${ch.id}`, true)
    .setColor(message.client.color.color)
    message.channel.send(yesembed)
}

  }
}