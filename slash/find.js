const msgg = require('../models/message')
const Discord = require('discord.js')

module.exports = {
    name: 'list',
    description: 'Shows a list of commands',
    async execute(client, interaction) {
        try{
            const findword = interaction.options?.find(c => c?.name === 'query')?.value;
            let cmdsa = await msgg.findOne({
                message: findword
            });
            if(!cmdsa){
                cmdsa = await msgg.findOne({
                    words: findword
                });
            }
            if(!findword){
                const lea = await msgg.find().limit(4)
                const yembed = new Discord.MessageEmbed()
                .setTitle(`All words`)
                .setColor(client.color.color)
                lea.forEach(c => {
                    yembed.addField(`Message: ${c.message}`, `Reply: ${c.reply}`);
                  });
                return await interaction.reply(yembed)
            }
            if(cmdsa){
                const foundembed = new Discord.MessageEmbed()
                .setTitle(`Results for ${findword} `)
                .addField(`Message: ${cmdsa.message}`, `Reply: ${cmdsa.reply}`)
                .setColor(client.color.color)
                interaction.reply(foundembed)
            } else {
                const notfoundembed = new Discord.MessageEmbed()
                .setTitle(`Could not find any matches for ${findword}`)
                .setColor('RED')
                interaction.reply(notfoundembed)
            }
        } catch (error){
            console.log('Error!', error)
        }
	},
};