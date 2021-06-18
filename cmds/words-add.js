const msgg = require('../models/message')
const Discord = require('discord.js')

module.exports = {
    name: 'add',
    description: 'Add a word to a message',
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
                .setTitle(`Added ${args[1]} to ${cmdsa.message} words`)
                .setColor(message.client.color.color)
                message.reply(foundembed)
                msgg.findOne({
                    message: findword
                }, async (err, dUser) => {
                    if (err) console.log(err);
                    dUser.words.push(args[1])
                    await dUser.save().catch(e => console.log(e));
                });
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