// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Dennis S. Richard Richter <richter@vivaldi.net>

import bot from "./bot";

async function start() {
	await bot({
		channel: process.env.CHANNEL.toString(),
		notificationChannel: process.env.NOTIFICATION_CHANNEL.toString(),
		role: process.env.ROLE_ID.toString(),
		token: process.env.DISCORD_TOKEN,
	});
}

start();
