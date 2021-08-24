const Discord = module.require("discord.js")

module.exports.run = async function run(cmd_arguments) {
    cmd_arguments.message.channel.send("Bot by KatzenFisch \n Sourcecode available on github: https://github.com/max-meme/bouncy-bot");
}

module.exports.help = {
	name: "source",
	usage: `(prefix)source`,
	category: "misc",
	func: "source of bot"
}

module.exports.settings = {
    req_args: 0
}