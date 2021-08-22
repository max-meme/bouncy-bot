const Discord = module.require("discord.js")

module.exports.run = async (cmd_arguments) => {
	cmd_arguments.message.channel.send(`You joined at ${cmd_arguments.message.member.joinedAt}`)
}

module.exports.help = {
	name: "joined",
	usage: "(prefix)joined",
	category: "misc",
	func: "showes you when you joined this server"
}

module.exports.settings = {
    req_args: 0
}