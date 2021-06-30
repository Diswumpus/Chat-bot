const msgg = require('../models/error')
const Discord = require('discord.js')

module.exports = {
    name: 'error',
    async execute(client, interaction) {
        try{
            let u;
            const findword = interaction.options?.find(c => c?.name === 'code')?.value;
            let cmdsa = await msgg.findOne({
                id: findword
            });
            if(!findword){
                const lea = await msgg.find().limit(4)
                const yembed = new Discord.MessageEmbed()
                .setTitle(`All errors`)
                .setColor(client.color.color)
                lea.forEach(c => {
                    u = client.users.cache.get(c.user);
                    yembed.addField(`Case: ${c.id}`, `User: ${u.tag}\n\nError: ${c.error}`);
                  });
                return await interaction.reply(yembed)
            }
            if(cmdsa){
                u = client.users.cache.get(cmdsa.user);
                const foundembed = new Discord.MessageEmbed()
                .setTitle(`Results for ${findword} `)
                .addField(`Case: ${cmdsa.id}`, `User: ${u.tag}\n\nError: ${cmdsa.error}`)
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