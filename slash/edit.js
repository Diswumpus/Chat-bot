const Discord = require("discord.js");
const chh = require('../models/message')
const wait = require('util').promisify(setTimeout);
const perms = require('../models/permissions');

module.exports = {
    name: "edit",
    description: "Remove your data!",
    async execute(client, interaction) {
        let permss = await perms.findOne({
            user: interaction.user.id
        });
        if(permss.admin === true || permss.edit === true){
        const message = interaction.options?.find(c => c?.name === 'message')?.value;
        const newreply = interaction.options?.find(c => c?.name === 'new_reply')?.value;
        const followupp = interaction.options?.find(c => c?.name === 'followups')?.value;
        let cmdsa = await chh.findOne({
            message: message
        });
        /*
    user: String,
    message: String,
    reply: String,
    words: [String],
    followups: String
        */
        if (cmdsa) {
            chh.findOne({
                message: message
            }, async (err, dUser) => {
                if (err) console.log(err);
                if(newreply){
                    dUser.reply = newreply
                } else if(followupp){
                    dUser.followups = followupp
                }
                await dUser.save().catch(e => console.log(e));
            });
            let ncmdsa = await chh.findOne({
                message: message
            });
            const datadone = new Discord.MessageEmbed()
            .setTitle(`\`✅\` Changed!`)
            .addField('Message:', `▶ ${ncmdsa.message}`, true)
            .addField('Reply:', `▶ ${ncmdsa.reply}`, true)
            .addField('Follow Ups:', `▶ ${ncmdsa.followups}`, true)
            .addField('Words:', `▶ ${ncmdsa.words.map(a => a.name)}`, true)
            .setColor(client.color.color)
        await interaction.reply(datadone);
        } else if(!cmdsa){
            return interaction.reply(
                new Discord.MessageEmbed()
                .setTitle('Not Found!')
                .setColor('RED')
            )
        }
    }
    }
}