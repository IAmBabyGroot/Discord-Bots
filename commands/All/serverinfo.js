const client = require('discord.js-commando')

var embed
var Member
var Members
var Guild
var Guilds

class ServerInfoCommand extends client.Command {

    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'All',
            memberName: 'serverinfo',
            description: 'Shows the server info'
        })
    }

    async run(message, args) {
        Guild = message.guild
        embed = new Discord.RichEmbed({
            "title": "Server Info",
            "description": `Owner: ${Guild.owner.displayName} n\n Main Chat: ${Guild.defaultChannel} \n\n Region: ${Guild.region} \n\n Channels: ${Guild.channels.size} \n\n Members: ${Guild.memberCount} \n\n Default Role: ${Guild.defaultRole} \n\n Verification Level: ${Guild.verificationLevel} \n\n Created At: ${Guild.createdAt}`,
            "color": '009900',
            "footer": {
                "text": "MemesBot"
            }
        })
        message.channel.send({"embed": embed})
    }

}

module.exports = ServerInfoCommand