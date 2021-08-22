module.exports.run = async (cmd_arguments) => {
	var args = cmd_arguments.args;
	var message = cmd_arguments.message;
	var guildSettings = cmd_arguments.guildSettings;
	if(!args[0]) {
		message.channel.send(`The current prefix is \`${guildSettings[message.guild.id].prefix}\``);
		return;
	}
	if(!message.member.permissions.has("MANAGE_GUILD", true)) {
		message.channel.send("You need to have the permission \"manage guild\" to edit this!")
		return;
	}
	guildSettings[message.guild.id].prefix = args[0];
	message.channel.send(`The prefix has been changed to \`${args[0]}\``)
	cmd_arguments.updatedata();
}

module.exports.help = {
	name: "prefix",
	usage: "(prefix)prefix (new prefix)",
	category: "misc",
	func: "Updates the prefix for on this server or shows the current prefix"
}

module.exports.settings = {
    req_args: 0
}