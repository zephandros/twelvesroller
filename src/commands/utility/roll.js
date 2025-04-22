const { SlashCommandBuilder, codeBlock, EmbedBuilder } = require('discord.js');
const { Color } = require('../../utils/color.js');
const { TWSLogger } = require('../../utils/twslogger.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Makes a roll against a score.')
        .addIntegerOption(option => {
            return option.setName('total_score')
            .setDescription('12 + DIFFICULTY + STAT + SKILL + SITUATION')
            .setRequired(true);
        }),
    async execute(interaction) {
        const score = interaction.options.getInteger("total_score")
        //const result = await rollCommand(score);
        

        await interaction.reply(`Rolling against score of ${score}...`);

        const rollEmbed = await rollCommand(score);

        await interaction.editReply({embeds:[rollEmbed]});
    }
};

function rollDice(sides) {
    return 1 + Math.floor(Math.random() * sides);
}

function getResultMessage(first, second, score) {
    var message = "";
    var color = Color.RED;

    if (first == 1 && second == 1) {
        color = Color.EMERALD
        return "Critical success!";
    }

    if (first == 12 && second == 12) {
        color = Color.ROSE
        return "Critical failure!";
    }

    if ((first + second) <= score) {
        color = Color.GREEN;
        message = "Sucess!";
    } else {
        color = Color.RED;
        message = "Failure!";
    }

    if (first == second) {
        color = Color.YELLOW;
        message += " Twelves!";
    }
    TWSLogger.log(`message: ${message}, color: ${color}`);
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

function makeTable(score, result) {
    let table = "";
    table += `+-------------------+----------+\n`;
    table += `| ${result.message.padEnd(17, ' ')} | Score ${score.padStart(2, '0')} |\n`;
    table += `+-------------------+----------+\n`;
    table += `| [${result.first.padStart(2, '0')}] + [${result.second.padStart(2, '0')}] = ${result.total.padStart(2, '0')}  | Diff  ${result.difference.padStart(2, '0')} |\n`;
    table += `+-------------------+----------+`;
    return table;
}

// async function rollCommand(score) {
//     const result = rollTwelves(score);
//     return makeTable(score.toString(), result);
// }

async function rollCommand(score){
    await delay(1000);
    const result = rollTwelves(score);
    return new EmbedBuilder()
    .setTitle(`${result.message}`)
    .setDescription(`[${result.first}] + [${result.second}] = ${result.total}`)
    .setColor(result.color)
    .addFields(
        { name: 'Score', value: `${score}`,  inline: true },
        { name: 'Difference', value: `${result.difference}`,  inline: true },
    )
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}