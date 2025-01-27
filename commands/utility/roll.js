const { SlashCommandBuilder, codeBlock } = require('discord.js');

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
        const result = await rollCommand(score);

        await interaction.reply(`Rolling against score of ${score}...`);
        await interaction.editReply(codeBlock(result));
    }
};

function rollDice(sides) {
    return 1 + Math.floor(Math.random() * sides);
}

function getResultMessage(first, second, score) {
    var message = "";

    if (first == 1 && second == 1) {
        return "Critical success!";
    }

    if (first == 12 && second == 12) {
        return "Critical failure!";
    }

    if ((first + second) <= score) {
        message = "Sucess!";
    } else {
        message = "Failure!";
    }

    if (first == 6 && second == 6) {
        message += " Twelves!";
    }
    return message;
}

function rollTwelves(score) {
    const _first = rollDice(12);
    const _second = rollDice(12);
    const _total = _first + _second;
    const _difference = Math.abs((score - _total));
    return {
        message: getResultMessage(_first, _second, score),
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

async function rollCommand(score) {
    const result = rollTwelves(score);
    return makeTable(score.toString(), result);
}