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
if (!anonymousChannel || !token) {
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
    if (message.author.bot) return;

    const channel = message.channel;
    const r = Math.floor(Math.random() * 100000);
    const d = new Date();
    const messageStamp = "#" + r + " " + d.toLocaleDateString();

    if (channel.type === 1) { //dm
        dmMessage(message, messageStamp);
        return;
    }

    if (channel.id !== anonymousChannel) return;
    if (roleName && message.member.roles.cache.some((role) => role.name === roleName)) return; // admin can't send anonymous messages
    await channelMessage(channel, message, messageStamp);
});

function dmMessage(message, messageStamp) {
    client.channels.fetch(anonymousChannel).then((channel) => {
        channel.send({
            content: "```\n" + getAvatar(message.author.username) + "\n " + messageStamp + "```\n" + message.content + "\n\n--------------------",
            files: message.attachments.map(a => a.url)
        });
    })
    if(!modChannel) return;
    client.channels.fetch(modChannel).then((channel) => {
        channel.send({
            content: "```\n" + message.author.username + "\n " + messageStamp + "```\n" + message.content + "\n\n--------------------",
            files: message.attachments.map(a => a.url)
        });

    })
    return;
}


async function channelMessage(channel, message, messageStamp) {
    const originalMessageId = message.reference?.messageId;
    const replyAuthorUsername = message.author.username;
    let replyInfo = '';
    let originalMessage;

    if (originalMessageId) {
        try {
            originalMessage = await channel.messages.fetch(originalMessageId);
            const originalAuthorUsername = originalMessage.author.username;
            replyInfo = `\n\nReply to: @${originalAuthorUsername} (Message ID: ${originalMessageId})`;
            originalMessage.reply({
                content: "```\n" + getAvatar(replyAuthorUsername) + "\n " + messageStamp + "```\n" + message.content+"\n\n--------------------",
                files: message.attachments.map((a) => a.url),
            });
        } catch (error) {
            console.error('Error fetching original message:', error);
            client.channels.fetch(anonymousChannel).then((anonymousChannel) => {
                anonymousChannel.send({
                    content: "```\n" + getAvatar(replyAuthorUsername) + "\n " + messageStamp + "```\n" + message.content+"\n\n--------------------",
                    files: message.attachments.map((a) => a.url),
                });
            });
        }
    } else {
        client.channels.fetch(anonymousChannel).then((anonymousChannel) => {
            anonymousChannel.send({
                content: "```\n" + getAvatar(replyAuthorUsername) + "\n " + messageStamp + "```\n" + message.content+"\n\n--------------------",
                files: message.attachments.map((a) => a.url),
            });
        });
    }
    if(!modChannel) return;
    client.channels.fetch(modChannel).then((modChannel) => {
        modChannel.send({
            content: "```\n" + replyAuthorUsername + "\n " + messageStamp + "```\n" + message.content + replyInfo+"\n\n--------------------",
            files: message.attachments.map((a) => a.url),
        });
    });

    try{
        message.delete();
    }catch(error){
        console.error('Error deleting message:', error.message);
    }

}

client.login(token)
app.use(express.static("public"));
app.get("*", (req, res) => {
    res.send('<h1 style="color:blue;">Discord BOT is live</h1>');
});

app.listen(80, () => {
    console.log("Server is running on port 80");
});