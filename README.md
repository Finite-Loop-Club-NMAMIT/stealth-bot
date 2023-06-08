# Stealth Bot

<img src="https://github.com/FiniteLoop-NMAMIT/stealth-bot/assets/83623339/f68bf189-b25b-48db-944e-a955fc26cdfb" width="80"/>

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

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)

## Attributions
<a href="https://www.flaticon.com/free-icons/anonymous-message" title="anonymous message icons">Anonymous message icons created by alfanz - Flaticon</a>
