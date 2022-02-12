// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Dennis S. Richard Richter <richter@vivaldi.net>


/**
 * This file is intended to be used only if called via a compiled binary.
 * It is recommended to use the index.ts as entry-point and configure via environment variables
 */

import bot from "./bot";

// usage: bot.exe <token> <role-id> <log-channel-id> <alert-channel-id>
// for simplicity we use pop() and therefore index from the END of the command, not that start
// ugly, I know, but it works if you stick to the docs ;) (and will be changed soon™)
async function start() {
	await bot({
		notificationChannel: process.argv.pop().toString(),
		channel: process.argv.pop(),
		role: process.argv.pop().toString(),
		token: process.argv.pop(),
	});
}

start();
