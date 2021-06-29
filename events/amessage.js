const msgg = require('../models/message');
const chh = require('../models/link');

module.exports = {
	name: 'message',
	async execute(message, client, args) {
        try{
            if(message.author.bot){
                return
            }
            let thech = await chh.findOne({
                guild: message.guild.id
            });
        if(message.channel.name != 'bp' && thech.ch != message.channel.id){
            return
        }
        if(message.author.id === client.user.id){
            return
        }
        let cmdsa = await msgg.findOne({
            message: message.content.toLowerCase()
        });
        if(!cmdsa){
            cmdsa = await msgg.findOne({
                words: message.content.toLowerCase()
            });
        }
            message.channel.startTyping();
            setTimeout(() => {
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
                message.channel.stopTyping();
            }, 1000);
        } catch (error){
            console.log('Error!', error)
        }
		/*
            message: String,
    reply: string
    */
	},
};