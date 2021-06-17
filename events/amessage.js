const msgg = require('../models/message')

module.exports = {
	name: 'message',
	async execute(message, client, args) {
        try{
            if(message.author.bot){
                return
            }
        if(message.channel.name != 'bp'){
            return
        }
        if(message.author.id === client.user.id){
            return
        }
            let cmdsa = await msgg.findOne({
                message: message.content
            });
            if(!cmdsa){
                cmdsa = await msgg.findOne({
                    words: message.content
                });
            }
            if(cmdsa){
                message.reply({ content: `${cmdsa.reply}` })
                if(cmdsa.followups){
                    message.reply({ content: `${cmdsa.followups}` })
                }
            } else {
                const lastdm = [
                    `Wth?`,
                    `Wdym?`,
                    `What do you mean?`,
                    `What?`,
                    `?`,
                    `??`
                ]
                message.reply({ content: `${lastdm[Math.floor(Math.random() * lastdm.length)]}` })
            }
        } catch (error){
            console.log('Error!', error)
        }
		/*
            message: String,
    reply: string
    */
	},
};