const msgg = require('../models/message')

module.exports = {
	name: 'message',
	async execute(message, client, args) {
        if(message.author.bot){
            return
        }
        if(message.channel.name === 'bp'){
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