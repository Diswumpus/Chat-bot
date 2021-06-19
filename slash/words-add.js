const msgg = require('../models/message')
const Discord = require('discord.js')

module.exports = {
    name: 'aliases_add',
    description: 'Add a word to a message',
    async execute(client, interaction) {
        try{
            const findword = interaction.options?.find(c => c?.name === 'old_word')?.value;
            const newword = interaction.options?.find(c => c?.name === 'aliase')?.value;
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
                .setTitle(`Added ${newword} to ${cmdsa.message} words`)
                .setColor(client.color.color)
                interaction.reply(foundembed)
                if(cmdsa.words.indexOf(findword) !== -1){
                    msgg.findOne({
                        words: findword
                    }, async (err, dUser) => {
                        if (err) console.log(err);
                        dUser.words.push(newword)
                        await dUser.save().catch(e => console.log(e));
                    });
                } else {
                    msgg.findOne({
                        message: findword
                    }, async (err, dUser) => {
                        if (err) console.log(err);
                        dUser.words.push(newword)
                        await dUser.save().catch(e => console.log(e));
                    });
                }
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