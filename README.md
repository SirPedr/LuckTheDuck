# About Luck, the Duck
Luck, the Duck it's a discord bot that helps DM's finding details about a lot of monsters in D&D 5th edition so they can 
make combat more fluid and dynamic without having to check the Monster Manual everytime they wanna know something!

You cand add Luck to our server by clicking [this link](https://discord.com/api/oauth2/authorize?client_id=702685014378414140&permissions=26624&scope=bot).
# Why?
As a DM running games on Discord, I know that sometimes checking the core books might take a while and is not the most
practical thing to do when you need information, and having _any_ tool that helps making the games more dynamic and fluid
it's really helpful. I'm trying to contribute to this community giving a little help regarding monsters. And man, monsters can
have a lot of information, so that's why I'm here!

# How to Use It?
Once the bot is up and running, it will try to respond to any messages that starts with `!luck`. Right now he'll do nothing if
can't match any command.

# Running Locally
In order to run Luck, the Duck in dev environment, you need to do the following:
  - Clone the repo, run `yarn`
  - Create an Application in [Discord Developer Portal](https://discord.com/developers/applications). 
  - Go to `OAuth2` menu, then scroll down to the bottom of page, in `Scopes`. Select the `bot` option and copy the URL Discord gives you.
  - Replace `permissions=0` with `permissions=26624`. This will grant the bot permission to send messages in public and private channels.
  - Paste this URL in your browser and add your Luck clone to a server.
  - In your application, clcik "Bot" then in `Token` label click `Click to Reveal Token`. Copy it.
  - Create a `.env` file in repo root then paste: `BOT_TOKEN=Your_Token_Here`
  - Run `yarn start-dev`

 At this point your Luck clone should be up and running just fine. Yay!

## Commands
Right now Luck has only one command:
- `!luck [monsterName]`: Gives details about a monster named `monsterName`.
  - If the search returns more than one result, Luck will give you a list of options instead. Just type the number associated to the
  monster you want.
  - If monsterName is empty, Luck will give you a list of options too, but with all availables monsters in alphabetical order.

## Additional Options
- `!private`: Return monster details in private. You know, so the players can't see what will fight them.
