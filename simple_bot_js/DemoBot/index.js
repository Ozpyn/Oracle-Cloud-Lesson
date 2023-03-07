const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client({
    intents: Discord.IntentsBitField.Flags.Guilds
        | Discord.IntentsBitField.Flags.GuildMessages
        | Discord.IntentsBitField.Flags.MessageContent
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    //An easy indicator to determine if the bot has turned on properly.
});

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    //This bot will not respond to other bots
    if (msg.content.indexOf(config.prefix) !== 0) return;
    //Will only respond to a message if it starts with the defined prefix.

    const input = msg.content.toLowerCase();
    const args = input.slice(config.prefix.length).trim().split(/ +/g); //Splits input into arguments by spaces
    const command = args.shift(); //makes user input ignore capital letters
    //Commands (not slash)
    switch (command) {
        case "ping":
            console.log(`Pinged!`)
            msg.channel.send('Pong!');
            break;
        //The switch statement is set up so you can easily create new commands.
    }

});

client.login(config.token); // Log in with the bot token from our config file.