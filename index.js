const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");


//tokens
const yt_api_key = "AIzaSyDH1oVSXCfZLbo1eenRvSFdgk84XD7bXdc";
const discord_token = "ODc4NDc0NzEyODU3MDgzOTA2.YSBtVA.1szldjRXrViutLqO5VRcsfVWLlY";

client.login(discord_token);
client.commands = new Discord.Collection();

var guildSettings = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));
var never_ever = JSON.parse(fs.readFileSync('./never_ever.json', 'utf-8'));
var prefix = "~";
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
  console.log("BittyBot is online!");
  client.user.setActivity("~help for Help");
})

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.channel.send("Hi");
  
  if(!guildSettings[message.guild.id]) {
    guildSettings[message.guild.id] = {
      quotes: [],
      prefix: "~"
    }
    updatedata();
  }
  if(!never_ever[message.guild.id]) {
    never_ever[message.guild.id] = {
      questions: []
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
  if(command.startsWith("~")) prefix = "~";
  if(!command.startsWith(prefix)) return;

  let cmd = client.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(client, message, args, guildSettings, updatedata, musicchace, cmmds, never_ever);
})

function updatedata() {
  var data = JSON.stringify(guildSettings);
  fs.writeFile("settings.json", data, function(err) {
    if(err) {
        console.log(err)
    }
  });
  var data = JSON.stringify(never_ever);
  fs.writeFile("never_ever.json", data, function(err) {
    if(err) {
        console.log(err)
    }
  });
}