const { SlashCommandBuilder, codeBlock, EmbedBuilder } = require('discord.js');
const { Color } = require('../../utils/color.js');
const { TWSLogger } = require('../../utils/twslogger.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Makes a roll against a score.')
        .addIntegerOption(option => {
            return option.setName('total_score')
            .setDescription('STAT + SKILL + DIFFICULTY')
            .setRequired(true);
        }),
    async execute(interaction) {
        const username = interaction.user.displayName;
        const score = interaction.options.getInteger("total_score")
        //const result = await rollCommand(score);
        
        await interaction.reply(`\*\*${username} is rolling against score of ${score}...\*\*`);

        const rollEmbed = await rollCommand(username, score);

        await interaction.editReply({embeds:[rollEmbed]});
    }
};

function rollDice(sides) {
    return 1 + Math.floor(Math.random() * sides);
}

function getResultMessage(first, second, score) {
    var message = "";
    var color = Color.RED;
    var success = false;

    if (first == 1 && second == 1) {
        return {message: "Critical success!", color: Color.EMERALD};
    }

    if (first == 12 && second == 12) {
        return { message: "Critical failure!", color: Color.ROSE };
    }

    if ((first + second) <= score) {
        color = Color.GREEN;
        success = true;
        message = "Sucess";
    } else {
        color = Color.RED;
        message = "Failure";
    }

    if (first == second) {
        if(success){
            color = Color.YELLOW
        }else{
            color = Color.ORANGE
        }
        message += " with Luck";
    }
    message += '!';
    return { message, color };
}

function rollTwelves(score) {
    const _first = rollDice(12);
    const _second = rollDice(12);
    const _total = _first + _second;
    const _difference = Math.abs((score - _total));
    const {message, color } = getResultMessage(_first, _second, score);
    return {
        color: color,
        message: message,
        first: _first.toString(),
        second: _second.toString(),
        total: _total.toString(),
        difference: _difference.toString()
    };
}

// function makeTable(score, result) {
//     let table = "";
//     table += `+-------------------+----------+\n`;
//     table += `| ${result.message.padEnd(17, ' ')} | Score ${score.padStart(2, '0')} |\n`;
//     table += `+-------------------+----------+\n`;
//     table += `| [${result.first.padStart(2, '0')}] + [${result.second.padStart(2, '0')}] = ${result.total.padStart(2, '0')}  | Diff  ${result.difference.padStart(2, '0')} |\n`;
//     table += `+-------------------+----------+`;
//     return table;
// }

// async function rollCommand(score) {
//     const result = rollTwelves(score);
//     return makeTable(score.toString(), result);
// }

async function rollCommand(username, score){
    const result = rollTwelves(score);

    TWSLogger.log(`${username} rolled [${result.first}] + [${result.second}] = ${result.total} <= ${score}, ${username} made a ${result.message} with a difference of ${result.difference}.`);

    return new EmbedBuilder()
    // .setTitle(`\# ${result.message}`)
    .setDescription(`\# ${result.message} \n \#\# [ \*\*${result.first}\*\* ] + [ \*\*${result.second}\*\* ] = \*\*${result.total}\*\* \n`)
    .setColor(result.color)
    .addFields(
        { name: `\*Score\*`, value: `\*\*${score}\*\*`,  inline: true },
        { name: `\*Difference\*`, value: `\*\*${result.difference}\*\*`,  inline: true },
    )
}