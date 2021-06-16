const msgg = require('../models/message')

module.exports = {
	name: 'message',
	async execute(message, client, args) {
        if(message.channel.name === 'bp'){
            return
        }
        const filter = response => {
            return typeof(response.content) === 'string'
        };
        let cmdsa = await msgg.findOne({
            message: message.content
        });
        if(cmdsa?.message === message.content){
            return
        }
        message.channel.awaitMessages(filter, { max: 1, time: 50000, errors: ['time'] }).then(async collected => {
            cmdsa = new msgg({
                message: message.content,
                reply: collected.first(),
                words: []
            });
            await cmdsa.save().catch(e => console.log(e));
        })
		/*
            message: String,
    reply: string
    */
	},
};