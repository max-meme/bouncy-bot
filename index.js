const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INVITES", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_TYPING"], partials: ["CHANNEL"]});
const fs = require("fs");



//load files
var guildSettings = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));
var creds = JSON.parse(fs.readFileSync('./creds.json', 'utf-8'));

//login discord bot
client.login(creds.discord_token);
client.commands = new Discord.Collection();

var default_prefix = "b!";
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
  client.user.setActivity(`${default_prefix}help for bouncy Help | Bouncy is currently in beta`);
})

client.on("messageCreate", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "DM") return message.channel.send("Hi");
  
  if(!guildSettings[message.guild.id]) {
    guildSettings[message.guild.id] = {
      player_cache: [],
      prefix: default_prefix
    }
    updatedata();
  }
  if(guildSettings[message.guild.id].prefix) prefix = guildSettings[message.guild.id].prefix;

  let messageArray = message.content.toLowerCase().split(/\s+/g);
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
  if(cmd) {
    var err = check_settings(cmd_arguments, cmd);
    if(err) return message.channel.send(err)
    cmd.run(cmd_arguments);
  } 
})

//responsible for checking the commands settings before the command is run
function check_settings(cmd_arguments, cmd) {
  var error = null;
  if(cmd.settings.req_args > cmd_arguments.args.length) {
    error = `Missing ${cmd.settings.req_args - cmd_arguments.args.length} option(s)`
  }
  return error
}

function updatedata() {
  var data = JSON.stringify(guildSettings);
  fs.writeFile("settings.json", data, function(err) {
    if(err) {
        console.log(err)
    }
  })
}