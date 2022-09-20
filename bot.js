const request = require('request');
const Discord = require('discord.js');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('console-stamp')(console, 'HH:MM:ss.l');
const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

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
    console.log('Requesting: ' + options.url);
    client.user.setActivity('2w time: ? h', { type: ActivityType.Watching } );
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
        const totalCount = jsonObject.response.total_count;
        sumPlayTime = 0;

        for (var i = 0; i < totalCount; i++) {
            var playerGame = playerGames[i];
            sumPlayTime += playerGame.playtime_2weeks;
            console.log("retrieved game for '" + playerGame.name + "' is: '" + playerGame.playtime_2weeks + "'");
        }

        if (sumPlayTime > 0) {
            sumPlayTime = Number((sumPlayTime / 60).toFixed(1));
        }

        console.log("sum playtime is: " + sumPlayTime);

        if (process.env.TARGET_STEAM_ID2 && process.env.TARGET_STEAM_ID2.length > 0) {
            const options2 = {
                url: 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + steamApiKey + '&steamid=' + process.env.TARGET_STEAM_ID2 + '&format=json'
            };
            request(options2, callback2);
            return;
        }
    }

    if (!error && response.statusCode == 200) {
        client.user.setActivity('2w time: ' + Number((sumPlayTime).toFixed(1)) + ' h', { type: ActivityType.Watching } );
    } else {
        client.user.setActivity('2w time: ? h', { type: ActivityType.Watching } );
    }
}

function callback2(error, response, body) {
    console.log("Got response with http-code: " + response.statusCode);

    if (response.statusCode === 200) {
        const jsonObject = JSON.parse(body);
        var playerGames = jsonObject.response.games;
        const totalCount = jsonObject.response.total_count;
        sumPlayTime2 = 0;

        for (var i = 0; i < totalCount; i++) {
            var playerGame = playerGames[i];
            sumPlayTime2 += playerGame.playtime_2weeks;
            console.log("retrieved game for '" + playerGame.name + "' is: '" + playerGame.playtime_2weeks + "'");
        }

        if (sumPlayTime2 > 0) {
            sumPlayTime2 = Number((sumPlayTime2 / 60).toFixed(1));
        }

        sumPlayTime += sumPlayTime2;

        console.log("sum2 playtime is: " + sumPlayTime2);
        console.log("sum1 + sum2 playtime is: " + sumPlayTime);
    }

    if (!error && response.statusCode == 200) {
        client.user.setActivity('2w time: ' + Number((sumPlayTime).toFixed(1)) + ' h', { type: ActivityType.Watching } );
    } else {
        client.user.setActivity('2w time: ? h', { type: ActivityType.Watching } );
    }
}

setInterval(function() {
    console.log("Requesting...");
    request(options, callback);
}, 1000*1800);

client.login(discordApiKey);