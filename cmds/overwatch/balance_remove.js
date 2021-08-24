const Discord = module.require("discord.js")

module.exports.run = async function run(cmd_arguments) {
    var players = [...cmd_arguments.guildSettings[cmd_arguments.message.guildId].player_cache];
    var found = false;
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if(player.name == cmd_arguments.args[0]) {
            found = true;
            cmd_arguments.guildSettings[cmd_arguments.message.guildId].player_cache.splice(i, 1);
        }
    }
    if(found) cmd_arguments.message.channel.send(`Player \`${cmd_arguments.args[0]}\` has been removed`);
    else cmd_arguments.message.channel.send(`Player \`${cmd_arguments.args[0]}\` was not found`);
}

module.exports.help = {
	name: "balance-remove",
	usage: `(prefix)balance-remove`,
	category: "overwatch",
	func: "removes given player"
}

module.exports.settings = {
    req_args: 1
}