module.exports.run = async (client, message, args, guildSettings, updatedata, musicchace, cmmds) => {
	if(!args[0]) {
		message.channel.send(`The current prefix is ${guildSettings[message.guild.id].prefix}`);
		return;
	}
	if(!message.member.hasPermission("MANAGE_GUILD", false, true, true)) {
		message.channel.send("You need to have the permission \"manage guild\" to edit this!")
		return;
	}
	guildSettings[message.guild.id].prefix = args[0];
	message.channel.send(`The prefix has been changed to ${args[0]}`)
	updatedata();
}

module.exports.help = {
	name: "prefix",
	usage: "~prefix (new prefix)",
	category: "misc",
	func: "Updates the prefix for me on this server"
}