// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Dennis S. Richard Richter <richter@vivaldi.net>

import "dotenv/config";
import {Client, Intents} from "discord.js";

export class Bot {

	constructor(
		private config: { notificationChannel: string; channel: string; role: string; token: string; },
		private client = new Client({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
		})
	) {
	}

	start() {
		this.client.login(this.config.token);
	}
}

export default function bot(config: { notificationChannel: string; channel: string; role: string; token: string; }) {
	const bot = new Bot(config);
	bot.start();
}
