# welcomepack2role

Assigns roles to users that have gotten their WhalleyBot-WelcomePack

This is a very early version and only configurable for a single server.

A more sophisticated version (based on a message-broker, with automatic recovery and a lot more features) will follow
soon™ in another repository as part of a multipurpose bot-platform for SCUM Communities.

## How to use the released files to host your own bot:

### via Binary (no dependencies required)

- download the appropriate binary from the release page
    - e.g. `welcomepack2role-win.exe` for windows
- run the binary with the parameters `<token> <role-id> <log-channel-id> <alert-channel-id>`
    - e.g. `welcomepack2role-win.exe qWEr.Tz.Uiop 1234 5678 9012` *(your values will be significantly longer)*

### via Node

- download and extract `welcomepack2role-node`
- fill the `.env`-file with your environment variables
- run `npm install`
- run `npm start`

### via Docker

- download and extract `welcomepack2role-node`
- fill the `.env`-file with your environment variables
- run `docker build -t welcomepack2role .`
- run `docker run welcomepack2role`

## Configure

### How to prepare your discord server

You will need 2 channels and 1 role:

- a channel the whalleybot puts it purchase receipts in and players CANNOT write to
- a channel this bot can send alerts to
- a role that will be assigned to receivers of the welcome pack

Most likely all of these are already there.

### How to create a bot user

- go to https://discord.com/developers/applications/
- create an application
- click on the left side on "Bot"
- click on the right side on "Add Bot" (and confirm)´

### How to add the bot to your server

- on the left side, go to "OAuth2" and then "URL Generator"
- in "SCOPES" choose:
    - bot
- in "BOT PERMISSIONS" choose:
    - Manage Roles
    - Read Messages/View Channels
    - Manage Members
- open the url at the bottom of the page to add the bot to your server

### How to get IDs and Keys for your bot

the way configuration of each execution method is described above, you can get the values:

DiscordToken: https://discord.com/developers/applications/ -> your application -> Bot -> Copy-Button (below "Token")
Channel/Role-ID: Enable "DeveloperMode" in your Discord-Client, and you'll be able to right-click on almost any
discord-object to get its id. 
