const Discord = require("discord.js");
const wait = require('util').promisify(setTimeout);
const perms = require('../models/permissions');
const config = require('../config.json');

module.exports = {
    name: "permissions",
    async execute(client, interaction) {
        if(interaction.user.id === config.ownerID){
        const euser = interaction.options?.find(c => c?.name === 'user')?.user;
        const perm = interaction.options?.find(c => c?.name === 'permission')?.value;
        const method = interaction.options?.find(c => c?.name === 'method')?.value;
        let tperm = {"add": true, "remove": false};
        let permsm = {"edit": "", "delete": "", "admin": ""};
        if(method === 'remove'){
            permsm[perm] = false;
        } else if(method === 'add'){
            permsm[perm] = true;
        }
        let cmdsa = await perms.findOne({
            user: euser.id
        });
        if (cmdsa) {
            perms.findOne({
                user: euser.id
            }, async (err, dUser) => {
                if (err) console.log(err);
                /* Stuff */
                if (perm === 'edit') {
                    dUser.edit = permsm[perm];
                } else if (perm === 'delete') {
                    dUser.delete = permsm[perm];
                } else if (perm === 'admin') {
                    dUser.admin = permsm[perm];
                }
                /* Stuff */
                /* Schema
                user: String,
                edit: Boolean,
                delete: Boolean,
                admin: Boolean
                */
                await dUser.save().catch(e => console.log(e));
            });
        } else if (!cmdsa) {
            if (perm === 'edit') {
                cmdsa = new perms({
                    user: euser.id,
                    edit: permsm[perm]
                });
                await cmdsa.save().catch(e => console.log(e));
            } else if (perm === 'delete') {
                cmdsa = new perms({
                    user: euser.id,
                    delete: permsm[perm]
                });
                await cmdsa.save().catch(e => console.log(e));
            } else if (perm === 'admin') {
                cmdsa = new perms({
                    user: euser.id,
                    admin: permsm[perm]
                });
                await cmdsa.save().catch(e => console.log(e));
            }
        }
        const datadone = new Discord.MessageEmbed()
            .setTitle(`Permissions ${method} for ${euser.tag}`)
            .setColor(client.color.color)
            if(method === 'add'){
                datadone.addField('Permissions added:', `${perm}`, true)
            }
            if(method === 'remove'){
                datadone.addField('Permissions removed:', `${perm}`, true)
            }
        interaction.reply(datadone)
        }
    }
}