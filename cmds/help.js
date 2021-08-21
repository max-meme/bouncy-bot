const Discord = module.require("discord.js")

var categories = ["music", "quotes", "shipping", "misc", "never have I ever"]
module.exports.run = async (client, message, args, guildSettings, updatedata, musicchace, cmmds) => {
	var mess = new Discord.RichEmbed().setColor(0x33ccff).setFooter("< > = necessary, ( ) = optional");
	if(args[0]) {
		var gefunden = false;
		var i;
		for (i = 0; i < cmmds.length; i++) {
			if(cmmds[i].name == args[0]) {
				gefunden = true;
				break;
			} 
		}
		if(!gefunden) return message.channel.send(`No command found called ${args[0]}`);
		mess.setTitle(cmmds[i].name).addField(cmmds[i].usage, cmmds[i].func);
	} else {
		mess.setTitle("Commands");
		var text2 = "";
		for (var i = 0; i < categories.length; i++) {
			for (var j = 0; j < cmmds.length; j++) {
				if(cmmds[j].category == categories[i]) {
					text2 = text2 + `\`${cmmds[j].usage}\`  `
				}
			}
			mess.addField(categories[i], text2)
			text2 = "";
		}
	}
	message.channel.send(mess);
}

module.exports.help = {
	name: "help",
	usage: "~help (command)",
	category: "misc",
	func: "list of all commands"
}