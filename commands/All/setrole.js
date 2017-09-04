const client = require('discord.js-commando')

var embed
var Member
var Members
var Guild
var Guilds

class SetRoleCommand extends client.Command {

    constructor(client) {
        super(client, {
            name: 'setrole',
            group: 'All',
            memberName: 'setrole',
            description: 'Sets a user\'s role'
        })
    }

    async run(message, args) {
        if (message.guild.member(message.author).hasPermission("MANAGE_ROLES", false, true, true)) {
            Member = message.mentions.members.first()
            var newRole = args.slice(1).join(" ")
            Guild = message.guild
            var newrole = Guild.roles.find("name", newRole)
            if (message.guild.ownerID === message.author.id) {
                
            }
            else if (Member.highestRole.position <= newrole.position) {
                message.channel.send("Error: You Can't Set A Role Higher Or Equal Than Your Own!")
                return
            }
            Member.removeRoles(Member.roles)
            Member.addRole(newrole)
            message.channel.send(`${Member.user.tag} is now: ${newRole}`)
        } else {
            message.reply("Error: You Do Not Have Enough Permission!")
        }
    }

}

module.exports = SetRoleCommand