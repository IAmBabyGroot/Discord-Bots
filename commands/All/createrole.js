const client = require('discord.js-commando')

var Member

class CreateRoleCommand extends client.Command {

    constructor(client) {
        super(client, {
            name: 'createrole',
            group: 'All',
            memberName: 'createrole',
            description: 'Creats a role'
        })
    }

    async run(message, args) {
            if (message.guild.member(message.author).hasPermission("MANAGE_ROLES")) {
                Guild = message.guild
                Guild.createRole({
                    "name": args[0],
                    "color": args[1],
                    "permissions": args[2]
                })
            } else {
                message.reply("Error: You Do Not Have Enough Permission!")
            }
    }

}

module.exports = CreateRoleCommand
