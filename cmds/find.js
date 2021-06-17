const msgg = require('../models/message')
const Discord = require('discord.js')

module.exports = {
    name: 'find',
    description: 'Shows a list of commands',
    async execute(message, Member, args) {
        try{
            const findword = args[0];
            let cmdsa = await msgg.findOne({
                message: findword
            });
            if(!cmdsa){
                cmdsa = await msgg.findOne({
                    words: findword
                });
            }
            if(cmdsa){
                const foundembed = new Discord.MessageEmbed()
                .setTitle(`Results for ${findword} `)
                .addField(`Message: ${cmdsa.message}`, `Reply: ${cmdsa.reply}`)
                .setColor(message.client.color.color)
                message.reply(foundembed)
            } else {
                const notfoundembed = new Discord.MessageEmbed()
                .setTitle(`Could not find any matches for ${findword}`)
                .setColor('RED')
                message.reply(notfoundembed)
            }
        } catch (error){
            console.log('Error!', error)
        }
	},
};