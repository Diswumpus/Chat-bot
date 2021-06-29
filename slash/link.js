const Discord = require("discord.js");
const chh = require('../models/link')
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "link",
    description: "Remove your data!",
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return
        const ch = interaction.options?.find(c => c?.name === 'channel')?.channel;
        let cmdsa = await chh.findOne({
            guild: interaction.guild.id
        });
        /*
            guild: String,
        ch: String*/
        if (cmdsa) {
            chh.findOne({
                guild: interaction.guild.id
            }, async (err, dUser) => {
                if (err) console.log(err);
                dUser.ch = ch.id;
                await dUser.save().catch(e => console.log(e));
            });
        } else if(!cmdsa) {
            cmdsa = new chh({
                guild: interaction.guild.id,
                ch: ch.id
            });
            await cmdsa.save().catch(e => console.log(e));
        }
        const datadone = new Discord.MessageEmbed()
            .setTitle(`\`✅\` Linked!`)
            .addField('Channel:', `▶ ${ch}`, true)
            .addField('ID:', `▶ ${ch.id}`, true)
            .setColor(client.color.color)
        await interaction.reply(datadone);

    }
}