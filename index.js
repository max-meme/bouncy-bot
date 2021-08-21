const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INVITES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_MESSAGES"]});
const fs = require("fs");


//tokens
const yt_api_key = "AIzaSyDH1oVSXCfZLbo1eenRvSFdgk84XD7bXdc";
const discord_token = "ODc4NDc0NzEyODU3MDgzOTA2.YSBtVA.1szldjRXrViutLqO5VRcsfVWLlY";

client.login(discord_token);
client.commands = new Discord.Collection();

var guildSettings = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));
var default_prefix = "b!";
var musicchace = [];
var cmmds = [];

fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`)
    client.commands.set(props.help.name, props);
    cmmds.push({
      name: props.help.name,
      usage: props.help.usage,
      category: props.help.category,
      func: props.help.func
    })
  });
});

client.on("ready", () => {
  console.log("BouncyBot is online!");
  client.user.setActivity(`${default_prefix}help for bouncy Help`);
})

client.on("messageCreate", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.channel.send("Hi");
  
  if(!guildSettings[message.guild.id]) {
    guildSettings[message.guild.id] = {
      quotes: [],
      prefix: default_prefix
    }
    updatedata();
  }
  if(guildSettings[message.guild.id].prefix) prefix = guildSettings[message.guild.id].prefix;

  if(!musicchace[message.guild.id]) {
    musicchace[message.guild.id] = {
      search: [],
      queue: [],
      dispatcher: null,
      isplaying: false
    }
  }

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);
  if(command.startsWith(default_prefix)) prefix = default_prefix;
  if(!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length));
  //everything a command could ever want
  cmd_arguments = {
    client: client,
    message: message,
    args: args,
    guildSettings: guildSettings,
    updatedata: updatedata,
    cmmds: cmmds,
    prefix: prefix,
    default_prefix: default_prefix
  }
  if(cmd) cmd.run(cmd_arguments);
})

function updatedata() {
  var data = JSON.stringify(guildSettings);
  fs.writeFile("settings.json", data, function(err) {
    if(err) {
        console.log(err)
    }
  })
}