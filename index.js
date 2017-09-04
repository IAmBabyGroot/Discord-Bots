const Discord = require('discord.js');
const ytdl = require('ytdl-core')
const opus = require('opusscript')
const client = new Discord.Client();
var embed;
var Member;
var Guild;
var Guilds;

const prefix = "mb."

var servers = []

function play(connection, message) {
    var server = servers[message.guild.id]

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}))

    server.queue.shift();

    server.dispatcher.on('end', function() {
        if (server.queue[0]) {
            play(connection, message)
        } else {
            connection.disconnect();
        }
    })
}

client.on('ready', function() {
    console.log("Ready");
    client.user.setGame("on " + client.guilds.size + " guild(s)");
});

client.on('guildDelete', guild => {
    console.log(`I have left ${guild.name} at ${new Date()}`);
    client.user.setGame(`on ${client.guilds.size} guild(s)`);
});

client.on('guildCreate', guild => {
    guild.defaultChannel.send(`I have joined ${guild.name}`);
    client.user.setGame(`on ${client.guilds.size} guild(s)`);
});

client.on('guildMemberAdd', function(member) {
    let Guild = member.guild;
    Guild.defaultChannel.send(`Welcome ${member.user.username} to ${Guild.name}!`);
    if (message.guild.channels.find("name", "server-log")) {
        var serverLog = message.guild.channels.find("name", "server-log");
        if (channel.type === "text") {
            serverLog.send(`Member ${member.user.username} joined @ ${channel.createdAt}!`);
        }
    }
    if (message.guild.channels.find("name", "mod-log")) {
        var serverLog = message.guild.channels.find("name", "server-log");
        if (channel.type === "text") {
            serverLog.send(`Member ${member.user.username} joined @ ${channel.createdAt}!`);
        }
    }
});

client.on('guildMemberRemove', function(member) {
    let Guild = member.guild;
    Guild.defaultChannel.send(`Goodbye ${member.user.username}!`);
    if (message.guild.channels.find("name", "server-log")) {
        var serverLog = message.guild.channels.find("name", "server-log");
        if (channel.type === "text") {
            serverLog.send(`Member ${member.user.username} left @ ${channel.createdAt}!`);
        }
    }
    if (message.guild.channels.find("name", "mod-log")) {
        var serverLog = message.guild.channels.find("name", "mod-log");
        if (channel.type === "text") {
            serverLog.send(`Member ${member.user.username} left @ ${channel.createdAt}!`);
        }
    }
});

client.on('channelCreate', function(channel) {
    console.log(`A ${channel.type} channel by the name of ${channel.name} was created @ ${channel.createdAt} on ${channel.guild}`);
    if (message.guild.channels.find("name", "server-log")) {
        var serverLog = message.guild.channels.find("name", "server-log");
        if (channel.type === "text") {
            serverLog.send(`You created #${channel.name} @ ${channel.createdAt}!`);
        }
    }
    if (message.guild.channels.find("name", "mod-log")) {
        var serverLog = message.guild.channels.find("name", "mod-log");
        if (channel.type === "text") {
            serverLog.send(`You created #${channel.name} @ ${channel.createdAt}!`);
        }
    }
});

client.on('channelDelete', function(channel) {
    console.log(`A ${channel.type} channel by the name of ${channel.name} was deleted @ ${channel.createdAt} on ${channel.guild}`);
    if (message.guild.channels.find("name", "server-log")) {
        var serverLog = message.guild.channels.find("name", "server-log");
        if (channel.type === "text") {
            serverLog.send(`You deleted #${channel.name} @ ${channel.createdAt}!`);
        }
    }
    if (message.guild.channels.find("name", "mod-log")) {
        var serverLog = message.guild.channels.find("name", "mod-log");
        if (channel.type === "text") {
            serverLog.send(`You deleted #${channel.name} @ ${channel.createdAt}!`);
        }
    }
});

client.on('messageDelete', function(message) {
    if (message.guild.channels.find("name", "server-log")) {
        var serverLog = message.guild.channels.find("name", "server-log");
        serverLog.send(`${message.author.username} sent ${message} @ ${message.createdAt} in ${message.channel.name}`);
    }
    if (message.guild.channels.find("name", "mod-log")) {
        var serverLog = message.guild.channels.find("name", "mod-log");
        serverLog.send(`${message.author.username} sent ${message} @ ${message.createdAt} in ${message.channel.name}`);
    }
});

client.on('message', function(message) {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(prefix.length).toLowerCase();

    switch (command) {
        case "setnick":
            if (message.guild.member(message.author).hasPermission("CHANGE_NICKNAME")) {
            Member = message.mentions.members.first();
                var newNick = args.slice(1).join(" ");
                Member.setNickname(newNick);
                message.channel.send(`${Member.user.tag}'s nick is now: ${newNick}`);
            } else {
                message.reply("Error: You Do Not Have Enough Permission!");
            }
            break;
        case "createrole":
            if (message.guild.member(message.author).hasPermission("MANAGE_ROLES")) {
                Guild = message.guild;
                Guild.createRole({
                    "name": args[0],
                    "color": args[1],
                    "permissions": args[2]
                });
            } else {
                message.reply("Error: You Do Not Have Enough Permission!");
            }
            break;
        case "setrole":
            if (message.guild.member(message.author).hasPermission("MANAGE_ROLES", false, true, true)) {
                Member = message.mentions.members.first();
                var newRole = args.slice(1).join(" ");
                Guild = message.guild;
                var newrole = Guild.roles.find("name", newRole);
                if (message.guild.ownerID === message.author.id) {
                    
                }
                else if (Member.highestRole.position <= newrole.position) {
                    message.channel.send("Error: You Can't Set A Role Higher Or Equal Than Your Own!");
                    return;
                }
                Member.removeRoles(Member.roles);
                Member.addRole(newrole);
                message.channel.send(`${Member.user.tag} is now: ${newRole}`);
            } else {
                message.reply("Error: You Do Not Have Enough Permission!");
            }
            break;
        case "addrole":
            if (message.author.id === 260470661732892672) {
            	Member = message.mentions.members.first();
                var newRole = args.slice(1).join(" ");
                Guild = message.guild;
                var newrole = Guild.roles.find("name", newRole); 
                Member.addRole(newrole);
                return;
            }
            else if (message.guild.member(message.author).hasPermission("MANAGE_ROLES", false, true, true)) {
                Member = message.mentions.members.first();
                var newRole = args.slice(1).join(" ");
                Guild = message.guild;
                var newrole = Guild.roles.find("name", newRole); 
                if (message.guild.ownerID === message.author.id) {
                    
                }
                else if (Member.highestRole.position <= newrole.position) {
                    message.channel.send("Error: You Can't Set A Role Higher Or Equal Than Your Own!");
                    return;
                }
                Member.addRole(newrole);
                message.channel.send(`${Member.user.tag} has been given: ${newRole}`);
            } else {
                message.reply("Error: You Do Not Have Enough Permission!");
            }
            break;
        case "serverinfo":
            Guild = message.guild;
            embed = new Discord.RichEmbed({
                "title": "Server Info",
                "description": `Owner: ${Guild.owner.displayName} n\n Main Chat: ${Guild.defaultChannel} \n\n Region: ${Guild.region} \n\n Channels: ${Guild.channels.size} \n\n Members: ${Guild.memberCount} \n\n Default Role: ${Guild.defaultRole} \n\n Verification Level: ${Guild.verificationLevel} \n\n Created At: ${Guild.createdAt}`,
                "color": '009900',
                "footer": {
                    "text": "MemesBot"
                }
            })
            message.channel.send({"embed": embed});
            break;
        case "help":
            embed = new Discord.RichEmbed({
                "title": "Commands",
                "description": "serverinfo:\n Displays the server info. \n\n addrole:\n Adds a role to a user. \n\n setrole:\n Sets a user's role. \n\n createrole: \n Creates a new role. \n\n setnick: \n Sets a user's nick. \n\n help: \n Displays this message.",
                "color": '009900',
                "footer": {
                    "text": "MemesBot"
                }
            });
            message.channel.send({"embed": embed});
            break;
        case "embed":
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
            message.delete(0);
            break;
        case "purge":
            if (message.guild.member(message.author).hasPermission("MANAGE_MESSAGES", false, true, true)) {
                let msgn = args[0];
                message.channel.bulkDelete(msgn, true);
            }
        break;
        case "play":
            console.log(args.length)
            for (var i = 0; i < args.length; i++) {
                console.log("args[" + i + "]: " + args[i])
            }
            if (!args[0]) {
                message.channel.send("Please provide a link")
                return false;
            }
            if (!message.member.voiceChannel) {
                message.channel.send("You are not in a voice channel!")
                return false;
            }
            if (!servers[message.guild.id]) {
                servers[message.guild.id] = {
                    queue: []
                }
            }
            var server = servers[message.guild.id]
            server.queue.push(args[0])
            if (!message.guild.voiceConnection) {
                message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message)
                })
            }
        break;
        case "skip":
            var server = servers[message.guild.id]
            if (server.dispatcher) {
                server.dispatcher.end()
            }
        break;
        case "stop":
            var server = servers[message.guild.id]
            if (message.guild.voiceConnection) {
                message.guild.voiceConnection.disconnect()
            }
        break;
        default:
            message.reply("That is not a command");
        break;
    }

});

client.login(process.env.memes_bot);

const child = require('child_process')

startAll()

async function startAll () {
  await startNodemon('Bots/Eval/main.js')
    .catch(function (reason) {
      console.error(reason)
    })
  await startNodemon('Bots/MySelfBot/index.js')
    .catch(function (reason) {
      console.error(reason)
    })
}

async function startNodemon (input) {
  const file = await child.spawn('nodemon', [input])

  file.stdout.on('data', (data) => {
    console.log(String(data))
  })

  file.stderr.on('data', (data) => {
    console.error(String(data))
  })

  file.on('close', (code) => {
    console.log('child process exited with code ' + code)

    setTimeout(function () {
      start(input)
        .catch(function (reason) {
          console.error(reason)
        })
    }, 1000 * 5)
  })
}

async function startPython (input) {
  const file = await child.spawn('nodemon', [input])

  file.stdout.on('data', (data) => {
    console.log(String(data))
  })

  file.stderr.on('data', (data) => {
    console.error(String(data))
  })

  file.on('close', (code) => {
    console.log('child process exited with code ' + code)

    setTimeout(function () {
      start(input)
        .catch(function (reason) {
          console.error(reason)
        })
    }, 1000 * 5)
  })
}