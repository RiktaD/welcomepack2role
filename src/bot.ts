// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Dennis S. Richard Richter <richter@vivaldi.net>

import "dotenv/config";
import {Client, Intents, Message, Role, TextChannel} from "discord.js";

export class Bot {

	static UpMessage = 'Here to assign some roles!'
	static DownMessage = 'Looks like its time to go now!'

	id: string;
	notificationChannel: TextChannel = null;
	role: Role

	constructor(
		private config: { notificationChannel: string; channel: string; role: string; token: string; },
		private client = new Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		})
	) {
	}

	notify(message: string): null | Promise<Message> {
		console.log(message)
		return this.notificationChannel.send('<' + this.id + '> ' + message)
	}

	start() {
		this.client.once('ready', async () => {
			this.notificationChannel = this.client.guilds.cache.first().channels.cache.find(channel => channel.id === this.config.notificationChannel) as TextChannel
			this.id = this.client.readyTimestamp.toString().slice(-4);
			this.role = this.client.guilds.cache.first().roles.cache.find(role => role.id === this.config.role);
			this.notify(Bot.UpMessage)
			console.log('Up as ' + this.client.user.tag + ':' + this.id)
		});

		this.client.login(this.config.token);
	}

	shutdown() {
		this.notify(Bot.DownMessage)
	}
}

export default function bot(config: { notificationChannel: string; channel: string; role: string; token: string; }) {
	const bot = new Bot(config);

	process.on('SIGTERM', bot.shutdown.bind(bot));
	process.on('SIGINT', bot.shutdown.bind(bot));

	bot.start();
}
