const Discord = module.require("discord.js")

module.exports.run = async function run(cmd_arguments) {
    var players = [...cmd_arguments.guildSettings[cmd_arguments.message.guildId].player_cache];
    var team1 = [];
    var team2 = [];
    var removed = null;
    //sort players by sr
    players.sort(compare);

    //remove a random player if the team size is odd
    if(players.length % 2 == 1) {
        rn = Math.floor(Math.random() * players.length)
        players.splice(rn, 1)
    }

    //remove random players so that there are no more than 12
    while(players.length > 12) {
        rn = Math.floor(Math.random() * players.length)
        players.splice(rn, 1)
    }

    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if(i % 2 == 0) team1.push(player);
        else team2.push(player);
    }
    console.log(team1)
    console.log(team2)

    let text = "**Team 1** \n"
    team1.forEach(player => {
        text = text + `${player.name} \n`;
    });
    text = text + "\n**Team 2** \n"
    team2.forEach(player => {
        text = text + `${player.name} \n`;
    });
    cmd_arguments.message.channel.send(text);
    


    //compare players a and b
    function compare(a, b) {
        if (a.sr < b.sr){
          return -1;
        }
        if (a.sr > b.sr){
          return 1;
        }
        return 0;
    }
}

module.exports.help = {
	name: "balance",
	usage: `(prefix)balance`,
	category: "overwatch",
	func: "creates a balanced team out of the available players \n if the amount of players is uneven, one player will be removed"
}

module.exports.settings = {
    req_args: 0
}