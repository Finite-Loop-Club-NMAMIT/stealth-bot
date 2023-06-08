import express from "express";
const app = express();
import { config } from "dotenv";
config();
import { Client, GatewayIntentBits, Events, Partials } from "discord.js";
import getAvatar from "./avatar.js";

const anonymousChannel = process.env.ANONUMOUS_CHANNEL;
const roleName = process.env.ROLE_NAME;
const modChannel = process.env.MOD_CHANNEL;
const token = process.env.DISCORD_TOKEN;
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
    const messageStamp = Math.floor(Math.random() * 100000);
    const channel=message.channel;
    if(channel.type===1){
        dmMessage(message,messageStamp);
        return
    }
    
    if(channel.id!==anonymousChannel) return; 
    if (message.member.roles.cache.some((role) => role.name === roleName)) return; // admin can't send anonymous messages
    channelMessage(message,messageStamp);
})

function dmMessage(message,messageStamp){
    client.channels.fetch(anonymousChannel).then((channel) => {
        channel.send({
          content: "```\n" + getAvatar(message.author.username) + "\n " + str + "```\t" + message.content + "\n",
          files: message.attachments.map(a => a.url)
        });
  
        client.channels.fetch(modChannel).then((channel) => {
          channel.send({
            content: "```\n" + message.author.username + "\n " + str + "```\t" + message.content + "\n",
            files: message.attachments.map(a => a.url)
          });
  
        })
      })
    return;
}

function channelMessage(message,messageStamp){
    channel.send({
        content: "```\n" + getAvatar(message.author.username) + "\n " + str + "```\t" + message.content + "\n",
        files: message.attachments.map(a => a.url)
    });

    client.channels.fetch(modChannel).then((channel) => {
        channel.send({
            content: "```\n" + message.author.username + "\n " + str + "```\t" + message.content + "\n",
            files: message.attachments.map(a => a.url)
        });

    })
    message.delete();
}

client.login(token)
app.get("*", (req, res) => {
    res.send('<h1 style="color:blue;">Discord BOT is live</h1>');
});

app.listen(80, () => {
    console.log("Server is running on port 80");
});