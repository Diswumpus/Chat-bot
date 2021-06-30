const msgg = require('../models/message');
const chh = require('../models/link');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'message',
	async execute(message, client, args) {
        try{
            async function errorr(err) {
                const errors = require('../models/error')
                let gi = Math.floor(Math.random() * 5000);
                let tgi;
                let ie = false;
                for(;;){
                    tgi = await errors.findOne({
                        id: gi
                    })
                    if(gi !== tgi?.id || tgi?.id === 'null'){
                        ie = true
                    } else {
                        gi = Math.floor(Math.random() * 5000);
                    }
                    if(ie === true){ break; }
                }
                const tec = await new errors({
                    id: gi,
                    error: err,
                    user: message.author.id,
                    guild: message.guild.id
                });
                await tec.save().catch(e => console.log(e));
                //
                const errormsg = new MessageEmbed()
                .setTitle('\`❌\` Error!')
                .setImage('https://cdn.tixte.com/uploads/turtlepaw.is-from.space/kqiv6xq729a.png')
                .setDescription(`We ran into an error...\n\nReport this [here](https://discord.gg/5Wutrs8s4s) with error code \`${gi}\``)
                .setFooter(`Error: ${gi}`)
                .setColor('RED')
                message.reply(errormsg);
            }
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
                    if(cmdsa.reply.length === 0) errorr('UnhandledPromiseRejectionWarning: RangeError [MESSAGE_CONTENT_TYPE]: Message content must be a non-empty string.')
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
        } catch(err) {
            console.log('ERR', err)
            errorr(err)
        }
		/*
            message: String,
    reply: string
    */
	},
};