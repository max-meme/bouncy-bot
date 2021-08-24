const Discord = module.require("discord.js")

var categories = ["misc", "overwatch"]
module.exports.run = async (cmd_arguments) => {
	var cmmds = cmd_arguments.cmmds;
	var args = cmd_arguments.args;
	var mess = new Discord.MessageEmbed().setColor("#1fe8f2").setFooter("Options: < > = required, ( ) = optional");
	if(args[0]) {
		var gefunden = false;
		var i;
		for (i = 0; i < cmmds.length; i++) {
			if(cmmds[i].name == args[0]) {
				gefunden = true;
				break;
			} 
		}
		if(!gefunden) return cmd_arguments.message.channel.send(`No command found called ${args[0]}`);
		usage = cmmds[i].usage;
		usage = usage.replace("(prefix)", cmd_arguments.prefix);
		mess.setTitle(cmmds[i].name).addField(usage, cmmds[i].func);
	} else {
		mess.setTitle("Commands");
		var text2 = "";
		for (var i = 0; i < categories.length; i++) {
			for (var j = 0; j < cmmds.length; j++) {
				if(cmmds[j].category == categories[i]) {
					usage = cmmds[j].usage;
					usage = usage.replace("(prefix)", cmd_arguments.prefix);
					text2 = text2 + `\`${usage}\`  \n`
				}
			}
			if(text2 != "") mess.addField(categories[i], text2)
			text2 = "";
		}
	}
	cmd_arguments.message.channel.send({ embeds: [mess] });
}

module.exports.help = {
	name: "help",
	usage: `(prefix)help (command)`,
	category: "misc",
	func: "list of all commands or help for a specific command when (command) is given"
}

module.exports.settings = {
    req_args: 0
}