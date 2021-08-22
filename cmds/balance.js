const Discord = module.require("discord.js")

module.exports.run = async function run(cmd_arguments) {
}

module.exports.help = {
	name: "balance",
	usage: `(prefix)balance`,
	category: "overwatch",
	func: "creates a balanced team out of the available players"
}

module.exports.settings = {
    req_args: 0
}