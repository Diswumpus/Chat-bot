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
            if(collected.first().embeds.length > 0){
                return console.log('Embed:', message.embeds)
            }
            cmdsa = new msgg({
                user: message.author.id,
                message: message.content,
                reply: collected.first(),
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