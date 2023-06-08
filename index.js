import express from "express";
const app = express();
import { config } from "dotenv";
config();
import { Client, GatewayIntentBits, Events, Partials } from "discord.js";

const anonymousChannel = process.env.ANONUMOUS_CHANNEL;
const roleName = process.env.ROLE_NAME;
const modChannel = process.env.MOD_CHANNEL;
const token = process.env.TOKEN;

if(!anonymousChannel || !token) {
    console.log("Please set all required environment variables");
    process.exit(1);
}

let client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages],
    partials: [Partials.Channel, Partials.Message] // for DM permissions
})

client.once(Events.ClientReady, () => {
    console.log('Bot turned on');
});


client.on(Events.MessageCreate, async (message) => {
    if(message.author.bot) return;
    console.log(message.content);
    message.reply("Hello");
})

client.login(process.env.TOKEN)
app.get("*", (req, res) => {
    res.send('<h1 style="color:blue;">Discord BOT is live</h1>');
});

app.listen(80, () => {
    console.log("Server is running on port 80");
});