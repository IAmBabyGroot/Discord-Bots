const client = require('discord.js-commando')

var embed
var Member
var Members
var Guild
var Guilds

class Blank extends client.Command {

    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'All',
            memberName: 'invite',
            description: 'Sends an invite'
        })
    }

    async run(message, args) {
        message.reply("https://discordapp.com/oauth2/authorize?client_id=338445452888506369&scope=bot&permissions=2146958591");
    }

}
module.exports = Blank