const Discord = module.require("discord.js")

module.exports.run = async function run(cmd_arguments) {
    var args = cmd_arguments.args;
    var message = cmd_arguments.message;
    var name_input = args[0];
    var SR_input = args[1];

    var unranked = false
    var SR = 0

    //check if sr is number and between 1 and 5000
    if(SR_input == "unranked") unranked = true
    else {
        if(isNaN(SR_input)) return message.channel.send("SR option is not a number or \`unranked\`")
        SR = parseInt(SR_input)
        if(5000 < SR || SR < 1) return message.channel.send("SR needs to be between 1 and 5000 or \`unranked\`")
    }
    console.log(cmd_arguments.guildSettings)
    cmd_arguments.guildSettings[message.guildId].player_cache.push({name: name_input, sr: SR, unranked: unranked})
    cmd_arguments.updatedata();
    message.channel.send(`Player \`${name_input}\` has been added`)
}

module.exports.help = {
	name: "balance-add",
	usage: `(prefix)balance-add <player-name> <sr>`,
	category: "overwatch",
	func: "adds a player to be used in the balance command"
}

module.exports.settings = {
    req_args: 2
}