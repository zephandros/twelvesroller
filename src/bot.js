const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }

    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        console.log(`Initializing once event ${event.name}`);
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        console.log(`Initializing on event ${event.name}`);
        client.on(event.name, (...args) => {
            if('cooldown' in event){
                const eventCooldown = client.cooldowns.get(event.name);
                if(eventCooldown){
                    const now = Date.now();
                    if(now > eventCooldown){
                        client.cooldowns.delete(event.name);
                        event.execute(...args);
                    }
                }else{
                    const timestamp = Date.now() + event.cooldown;
                    client.cooldowns.set(event.name, timestamp)
                    event.execute(...args)
                }
            }else{
                event.execute(...args);
            }
        });
    }
}

client.login(process.env.DISCORD_TOKEN);