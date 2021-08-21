module.exports.run = async (client, message, args, guildSettings, updatedata, musicchace, cmmds) => {
	message.channel.send(`There are ${message.member.guild.memberCount} mebers on this server`);
}

module.exports.help = {
	name: "membercount",
	usage: "~membercount",
	category: "misc",
	func: "counts all members on the server"
}