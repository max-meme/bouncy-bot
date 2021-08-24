module.exports.run = async function run(cmd_arguments) {
    var players = [...cmd_arguments.guildSettings[cmd_arguments.message.guildId].player_cache]
    console.log(players);
    players.splice(Math.floor(Math.random() * players.length), 1)
}

module.exports.help = {
	name: "test",
	usage: `(prefix)balance`,
	category: "overwatch",
	func: "creates a balanced team out of the available players"
}

module.exports.settings = {
    req_args: 0
}