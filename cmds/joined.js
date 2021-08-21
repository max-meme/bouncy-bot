const Discord = module.require("discord.js")

var categories = ["music", "quotes", "shipping", "misc"]
module.exports.run = async (client, message, args, guildSettings, updatedata, musicchace, cmmds) => {
	message.channel.send(`You joined at ${message.member.joinedAt}`)
}

module.exports.help = {
	name: "joined",
	usage: "~joined",
	category: "misc",
	func: "showes you when you joined this guild"
}