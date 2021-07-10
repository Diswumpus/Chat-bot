const Discord = require("discord.js");
const chh = require('../models/message')
const wait = require('util').promisify(setTimeout);
const perms = require('../models/permissions');

module.exports = {
    name: "delete",
    description: "Remove your data!",
    async execute(client, interaction) {
        if(interaction.options?.size === 0){
            const nooptions = new Discord.MessageEmbed()
            .setTitle('You must have 1 option')
            return await interaction.reply({ embeds: [nooptions] });
        }
        let permss = await perms.findOne({
            user: interaction.user.id
        });
        if(permss.admin === true || permss.edit === true){
        const message = interaction.options?.find(c => c?.name === 'message')?.value;
        const newreply = interaction.options?.find(c => c?.name === 'reply')?.value;
            await chh.findOneAndRemove({
                message: message
            })
            const datadone = new Discord.MessageEmbed()
            .setTitle(`\`✅\` Removed`)
            .setDescription(`Removed \`${message || newreply}!\``)
            .setColor(client.color.color)
        await interaction.reply({ embeds: [datadone] });
    }
    }
}