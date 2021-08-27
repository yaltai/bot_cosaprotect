const { Client, Collection, MessageEmbed } = require('discord.js');

console.clear()
require('dotenv-flow').config();

const client = new Client({
    intents: 32767
})
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config");
client.aliases = new Collection();
client.cooldowns = new Collection();

require("./handler")(client);

client.login(process.env.TOKEN)