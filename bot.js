const request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();
require('console-stamp')(console, 'HH:MM:ss.l');

if (!process.env.DISCORD_API_KEY || process.env.DISCORD_API_KEY.length <= 0) {
    console.log('ERROR: Env variable DISCORD_API_KEY does not exists or is empty!');
    process.exit(1);
}

if (!process.env.STEAM_API_KEY || process.env.STEAM_API_KEY.length <= 0) {
    console.log('ERROR: Env variable STEAM_API_KEY does not exists or is empty!');
    process.exit(1);
}

if (!process.env.TARGET_STEAM_ID || process.env.TARGET_STEAM_ID.length <= 0) {
    console.log('ERROR: Env variable TARGET_STEAM_ID does not exists or is empty!');
    process.exit(1);
}

const discordApiKey = process.env.DISCORD_API_KEY;
const steamApiKey = process.env.STEAM_API_KEY;
const targetPlayerSteamId = process.env.TARGET_STEAM_ID;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('? players playing.', { url: 'http://www.dystopia-game.com', type: 'WATCHING' } );
    request(options, callback);
});

const options = {
    url: 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + steamApiKey + '&steamid=' + targetPlayerSteamId + '&format=json'
};

function callback(error, response, body) {
    console.log("Got response with http-code: " + response.statusCode);

    if (response.statusCode === 200) {
        const jsonObject = JSON.parse(body);
        var playerGames = jsonObject.response.games;
        for (var i = 0, count = jsonObject.response.total_count; i < total_count; i++) {
            var playerGame = playerGames[i];

            console.log("retrieved game for '" + playerGame.name + "' is: '" + playerGame.playtime_2weeks + "'");
        }
    }

    // if (!error && response.statusCode == 200 && playerCount >= 0) {
    //     client.user.setActivity(playerCount + ' players playing', { url: 'http://www.dystopia-game.com', type: 'WATCHING' } );
    // } else {
    //     client.user.setActivity('? players playing', { url: 'http://www.dystopia-game.com', type: 'WATCHING' } );
    // }
}

setInterval(function() {
    console.log("Requesting...");
    request(options, callback);
}, 1000*300);

client.login(discordApiKey);