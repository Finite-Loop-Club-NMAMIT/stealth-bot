# Stealth Bot

<img src="https://github.com/FiniteLoop-NMAMIT/stealth-bot/assets/83623339/67146007-290a-4b9a-8404-1f34ff5f95ee" width="80"/>

An anonymous chatting bot for Discord.

[![Run on Replit](https://binbashbanana.github.io/deploy-buttons/buttons/remade/replit.svg)](https://replit.com/github/FiniteLoop-NMAMIT/stealth-bot)
[![Deploy to Render](https://binbashbanana.github.io/deploy-buttons/buttons/remade/render.svg)](https://render.com/deploy?repo=https://github.com/FiniteLoop-NMAMIT/stealth-bot)

## Features
- Complete Anonymity: Chat anonymously on Discord without revealing your identity.
- Anonymous Message Forwarding: Send messages to the bot or the channel on server, and it will repost them anonymously to a designated channel.
- Moderator Visibility: Forwarded messages are displayed in a separate channel, allowing moderators to see the original sender.

## How to use
- Deploy the bot and invite it to your server
- Create 2 channels, one for the users to send messages and one for the bot to forward the messages to Users with specific role
- The users can be anonymous either by sending the messages to the channel you created or by directly messaging the bot
    - In first case, as soon as user sends a message the bot will delete it and resend it anonymously. But the notification will be momentarily visible to anyone who is online at that time.
    - In second case, the bot will directly forward the message to the channel you created.
- The bot will also forward the message to the second channel you created where users of specific role are allowed to see who actually sent the message.
>**Note:** 
> The bot will ignore the messages sent by users with the role specified in environment variable `ROLE_NAME` and will forward the messages to a channel which has the name specified in environment variable `MOD_CHANNEL` along with the original message's author's name.

## Development Environment Setup
### Clone the repo 
```
git clone https://github.com/FiniteLoop-NMAMIT/stealth-bot.git
```
### Install Dependencies
```
npm i
```

### Setup enviornment variable
- Set up a application from the [discord developer portal](https://discord.com/developers/docs/game-sdk/applications)
- Refer [this](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
- Setup the configurations of the bot and get the token put it in the env

![image](https://github.com/FiniteLoop-NMAMIT/stealth-bot/assets/91735807/035d9161-9de9-4c03-9085-e76bb04911eb)

- Get the generated from the below URL and use to register the bot to your server

![image](https://github.com/FiniteLoop-NMAMIT/stealth-bot/assets/91735807/1c734f9c-1c3f-471d-9dbe-a6789966152e)

- Get the channel id of the anonymous channel and optionally log/mod channel id. Refer [this](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) to get channel id
- Optionally you can add role name whose messages won't be anonymous

### Run the app
```
npm run dev
```

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)

## Attributions
<a href="https://www.flaticon.com/free-icons/anonymous-message" title="anonymous message icons">Anonymous message icons created by alfanz - Flaticon</a>
