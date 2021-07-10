const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);
const chh = require('../models/link')

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
    let cmdsa = await chh.findOne({
      guild: message.guild.id
  });
  /*
      guild: String,
  ch: String*/
  if (cmdsa) {
      chh.findOne({
          guild: message.guild.id
      }, async (err, dUser) => {
          if (err) console.log(err);
          dUser.ch = ch.id;
          await dUser.save().catch(e => console.log(e));
      });
  } else if(!cmdsa) {
      cmdsa = new chh({
          guild: message.guild.id,
          ch: ch.id
      });
      await cmdsa.save().catch(e => console.log(e));
  }
    const yesembed = new Discord.MessageEmbed()
    .setTitle('Created!')
    .addField('Channel:', `▶ ${ch}`, true)
    .addField('ID:', `▶ ${ch.id}`, true)
    .setColor(message.client.color.color)
    message.channel.send({ embeds: [yesembed] })
}

  }
}