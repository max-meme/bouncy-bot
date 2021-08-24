const Discord = module.require("discord.js")

module.exports.run = async function run(cmd_arguments) {
    cmd_arguments.guildSettings[cmd_arguments.message.guildId].player_cache = [];
    cmd_arguments.updatedata();
    cmd_arguments.message.channel.send(`Player list has been cleared`)
}

module.exports.help = {
	name: "balance-clear",
	usage: `(prefix)balance-clear`,
	category: "overwatch",
	func: "clears the player list to be used in the balance command"
}

module.exports.settings = {
    req_args: 0
}