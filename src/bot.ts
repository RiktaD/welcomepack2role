// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Dennis S. Richard Richter <richter@vivaldi.net>

import "dotenv/config";
import {Client, Intents, Message, Role, TextChannel} from "discord.js";

export class Bot {

	static UpMessage = 'Here to assign some roles!'
	static DownMessage = 'Looks like its time to go now!'

	id: string;
	prefix: string;
	notificationChannel: TextChannel = null;
	role: Role

	constructor(
		private config: { notificationChannel: string; channel: string; role: string; token: string; },
		private client = new Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		})
	) {
	}

	handleMessageOfMyself(message: Message) {
		if (message.content.includes(this.id)) {
			return; // it's me, and even my own instance!
		} // or it's another instance of myself, shall we talk to it?

		if (message.content.includes(Bot.UpMessage)) {
			message.reply(this.prefix + 'I am here as well. Are you here to replace me?')
			return;
		}

		if (message.content.includes(Bot.DownMessage)) {
			message.reply(this.prefix + 'Don\'t worry other me, I\'ve got this!')
			return;
		}
	}

	notify(message: string): null | Promise<Message> {
		console.log(message)
		return this.notificationChannel.send(this.prefix + message)
	}

	start() {
		this.client.once('ready', async () => {
			this.notificationChannel = this.client.guilds.cache.first().channels.cache.find(channel => channel.id === this.config.notificationChannel) as TextChannel
			this.id = this.client.readyTimestamp.toString().slice(-4);
			this.prefix = '<' + this.id + '> ';
			this.role = this.client.guilds.cache.first().roles.cache.find(role => role.id === this.config.role);
			this.notify(Bot.UpMessage)
			console.log('Up as ' + this.client.user.tag + ':' + this.id)
		});

		this.client.on('messageCreate', async message => {
			try {
				if (message.member.user.tag === this.client.user.tag) {
					this.handleMessageOfMyself(message);
					return;
				}

				if (message.channelId !== this.config.channel // not log-channel
					|| !message.content.includes('PURCHASE RECEIPT') // not a purchase receipt
					|| !message.content.includes('PackName: WelcomePack') // not a welcome pack
					|| !message.content.includes('Status: COMPLETED') // not completed yet
				) return;

				const discordId = message.content.match(/DiscordID:\s(\d+)/)[1];
				const target = message.guild.members.cache.find(member => {
					return member.id === discordId
				})

				target.roles.add(this.role).then(() => {
					message.react('☑️');
				});
			} catch (e) {
				message.react('🚨');
				message.reply(e.message);
				console.error(e.message);
			}
		});

		this.client.login(this.config.token);
	}

	shutdown() {
		this.notify(Bot.DownMessage).then(() => {
			this.client.destroy();
			process.exit(0);
		})
	}
}

export default function bot(config: { notificationChannel: string; channel: string; role: string; token: string; }) {
	const bot = new Bot(config);

	process.on('SIGTERM', bot.shutdown.bind(bot));
	process.on('SIGINT', bot.shutdown.bind(bot));

	bot.start();
}
