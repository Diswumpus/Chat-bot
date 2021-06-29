const msgg = require('../models/message')
const chh = require('../models/link');

module.exports = {
	name: 'message',
	async execute(message, client, args) {
        if(message.author.bot){
            return
        }
        let thech = await chh.findOne({
            guild: message.guild.id
        });
        if(message.channel.name === 'bp' || thech?.ch === message.channel.id){
            return
        }
        const filter = response => {
            return typeof(response.content) === 'string'
        };
        let cmdsa = await msgg.findOne({
            message: message.content
        });
        // if(cmdsa?.message === message.content){
        //     return
        // }
        if(message.embeds.length > 0){
            return console.log('Embed:', message.embeds)
        }
        message.channel.awaitMessages(filter, { max: 1, time: 50000, errors: ['time'] }).then(async collected => {
            if(cmdsa.reply.toLowerCase() === collected.first().content.toLowerCase() || cmdsa.message.toLowerCase() === message.content.toLowerCase()) return
            if(collected.first().author.bot){
                return
            }
            if(collected.first().content > 3) return console.log('Not adding message! Content: ', collected.first().content)
            cmdsa = new msgg({
                user: message.author.id,
                message: message.content.toLowerCase(),
                reply: collected.first().content.toLowerCase(),
                words: [],
                followups: ''
            });
            await cmdsa.save().catch(e => console.log(e));
        })
		/*
            message: String,
    reply: string
    */
	},
};