const client = require('discord.js-commando')

var embed
var Member
var Members
var Guild
var Guilds

class Blank extends client.Command {

    constructor(client) {
        super(client, {
            name: 'purge',
            group: 'All',
            memberName: 'purge',
            description: 'Deletes messages'
        })
    }

    async run(message, args) {
        if (message.guild.member(message.author).hasPermission("MANAGE_MESSAGES", false, true, true)) {
            let msgn = args[0]
            message.channel.bulkDelete(msgn, true)
        }
    }

}

module.exports = Blank