const Discord = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')
const ffmpeg = require('ffmpeg')
const opus = require('opusscript')
const client = new Discord.Client()
const prefix = "sb."

var embed;

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
    console.log(`${client.ping} ping`)
    console.log('I Am Done!')
})

client.on('message', function(message) {
    if (message.author !== client.user) return;
    console.log(message.author.username + message.content)
    const args = message.content.split(/\s + /g)
    const command = args.shift().slice(prefix.length).toLowerCase();
    switch (command) {
        case "game":
        if (args.length == 0) {
            message.channel.send("You must specify a game!")
            break;
        }
        var game;
        for (var i = 0; i < args.length; i++) {
            game = game + " " + args[i]
        }
        game = game.trim();
        client.user.setGame(game);
        break;
        case "status":
        if (args.length == 0 || args.length >= 2) {
            message.channel.send("You Must Only Specify A Status!")
            break;
        }
        if ((args[0].toLowerCase() === "online") || (args[0].toLowerCase() === "idle") || (args[0].toLowerCase() === "dnd") || (args[0].toLowerCase() === "invisible")) {
            client.user.setStatus(args[0].toLowerCase())
        }
        break;
        case "play":
        if (!args[0]) {
            message.channel.send("Please provide a link")
            break;
        }
        if (!message.member.voiceChannel) {
            message.channel.send("You are not in a voice channel!")
        }
        if (!servers[message.guild.id]) {
            servers[message.guild.id] = {
                queue: []
            }
        }
        var server = servers[message.guild.id]
        server.queue.push(args[0])
        if (!message.guild.voiceConnection) {
            message.member.voiceChannel.join().then(function(connection){
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
        message.channel.send("That is not a command")
    }
})

client.login(process.env.selfbot_token)