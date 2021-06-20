const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);

module.exports = {
  name: "info",
  description: "Remove your data!",
  async execute(client, interaction) {
    const datadone = new Discord.MessageEmbed()
    .setTitle(`\`🔗\` Info`)
    .addField('`🔗` Invite:', `[Click here!](${client.color.boti})`)
    .setDescription(`What is __Bluebot__?\nBluebot is a community built bot, when you say something it stores it don't worry you can delete your data by doing \`/remove_my_data\` if this does not work join [here](${client.color.invite})\n\n__Contributing__\nWant to contributing? Join [here](${client.color.invite}) ([Github](https://github.com/Turtlebot-Discord/Chat-bot))or just say stuff to add more words to the database! You can also edit stuff (\`/edit\`)`)
    .setColor(client.color.color)
    await interaction.reply(datadone)

  }
}