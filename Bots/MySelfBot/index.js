const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "sb."

var embed;

client.on('ready', function() {
    console.log(`${client.ping} ping`)
    console.log('I Am Done!')
})

client.on('message', function(message) {
    if (message.author !== client.user) return;
    const args = message.content.split(/\s + /g)
    const command = args.shift().slice(prefix.length).toLowerCase();
    if (command === "Hello") {
        message.delete(0);
        embed = new Discord.RichEmbed({
            "title": message.author.username,
            "description": "World"
        })
        message.channel.send({
            "embed": embed
        })
    }
})

client.login(process.env.selfbot_token)