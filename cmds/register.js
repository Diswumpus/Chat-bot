const Discord = require('discord.js');

module.exports = {
    name: 'register',
    description: 'Register a slash command!',
    async execute(message, Member, args) {
        const client = message.client
        if (!client.application?.owner) await client.application?.fetch();
        //https://discord.com/oauth2/authorize?client_id=841782635386109972&scope=bot+applications.commands
        const old_data = {
            name: 'permissions',
            description: 'Edit a permission for a user!',
            options: [{
                name: 'user',
                type: 'USER',
                description: 'What user?',
                required: true,
            },
            {
                name: 'method',
                type: 'STRING',
                description: 'Add or remove permissions?',
                required: true,
                choices: [
					{
						name: 'Add',
						value: 'add',
					},
					{
						name: 'Remove',
						value: 'remove',
					},
				],
            },
            {
                name: 'permission',
                type: 'STRING',
                description: 'What permission?',
                required: true,
                choices: [
					{
						name: 'Edit',
						value: 'edit',
					},
					{
						name: 'Delete',
						value: 'delete',
					},
					{
						name: 'Admin',
						value: 'admin',
					},
				],
            }],
        };
        const data = {
            name: 'delete',
            description: 'Delete a message!',
            options: [{
                name: 'message',
                type: 'STRING',
                description: 'What message?',
                required: false,
            },
            {
                name: 'reply',
                type: 'STRING',
                description: 'What reply?',
                required: false,
            }],
        };
        const command = await client.application?.commands.create(data);
        //const command = await client.guilds.cache.get('842575277249921074')?.commands.create(data);
        //await command.setPermissions(permissions);
        console.log(command);
    }
}


//Announce Options =>

// options: [{
//     name: 'channel',
//     type: 'CHANNEL',
//     description: 'What channel should i announce this in?',
//     required: true,

//     name: 'title',
//     type: 'STRING',
//     description: 'What should i announce?',
//     required: true,
// }],


//Slash server =>
//const command = await client.guilds.cache.get('842575277249921074')?.commands.create(data);
//const command = await client.application?.commands.create(data);
//Turtlepaw's =>
//const command = await client.guilds.cache.get('824365717573992480')?.commands.create(data);
//Turtlebot =>
//const command = await client.guilds.cache.get('834199640702320650')?.commands.create(data);
// const permissions = [
//     {
//         id: '820465204411236362',
//         type: 'USER',
//         permission: true,
//     },
// ];