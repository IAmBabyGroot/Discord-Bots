const client = require('discord.js-commando')

var embed
var Member
var Members
var Guild
var Guilds

class Blank extends client.Command {

    constructor(client) {
        super(client, {
            name: 'embed',
            group: 'All',
            memberName: 'embed',
            description: 'Creates an embed'
        })
    }

    async run(message, args) {
        let desc = ""
        for (var i = 1; i < args.length; i++) {
            desc = desc + " " + args[i]
        }
        embed = new Discord.RichEmbed({
            "title": args[0],
            "description": desc,
            "color": '009900',
            "footer": {
                "text": message.author.username
            }
        })
        message.channel.send({
            "embed": embed
        })
        message.delete(0)
    }

}

module.exports = Blank