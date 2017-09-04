const client = require('discord.js-commando')

var Member

class SetNickCommand extends client.Command {

    constructor(client) {
        super(client, {
            name: 'setnick',
            group: 'All',
            memberName: 'setnick',
            description: 'Sets a user\'s nick'
        })
    }

    async run(message, args) {
        if (message.guild.member(message.author).hasPermission("CHANGE_NICKNAME")) {
            Member = message.mentions.members.first()
            var newNick = args.slice(1).join(" ")
            Member.setNickname(newNick)
            message.channel.send(`${Member.user.tag}'s nick is now: ${newNick}`)
        } else {
            message.reply("Error: You Do Not Have Enough Permission!")
        }
    }

}

module.exports = SetNickCommand