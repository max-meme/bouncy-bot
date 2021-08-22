module.exports.run = async (cmd_arguments) => {
	cmd_arguments.message.channel.send(`This server has ${cmd_arguments.message.member.guild.memberCount} mebers`);
}

module.exports.help = {
	name: "membercount",
	usage: "(prefix)membercount",
	category: "misc",
	func: "counts all members on the server"
}

module.exports.settings = {
    req_args: 0
}