const client = require('discord.js-commando')

var embed
var Member
var Members
var Guild
var Guilds

class AddRoleCommand extends client.Command {

    constructor(client) {
        super(client, {
            name: 'addrole',
            group: 'All',
            memberName: 'addrole',
            description: 'Adds a role to a person'
        })
    }

    async run(message, args) {
        if (message.author.id === 260470661732892672) {
            Member = message.mentions.members.first()
            var newRole = args.slice(1).join(" ")
            Guild = message.guild
            var newrole = Guild.roles.find("name", newRole) 
            Member.addRole(newrole)
            return
        }
        else if (message.guild.member(message.author).hasPermission("MANAGE_ROLES", false, true, true)) {
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
            Member.addRole(newrole)
            message.channel.send(`${Member.user.tag} has been given: ${newRole}`)
        } else {
            message.reply("Error: You Do Not Have Enough Permission!")
        }
    }

}

module.exports = AddRoleCommand