const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const deepl = require('deepl-node');
const { deeplAPI } = require('../../config.json');

const translator = new deepl.Translator(deeplAPI);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate your text.')
		.addStringOption(option => 
			option.setName('text')
				.setDescription('The text to translate')
				.setRequired(true))
		.addStringOption(option => 
			option.setName('target_language')
				.setDescription('The language to translate to')
				.setRequired(true)
				.addChoices(
					{ name: 'Arabic', value: 'ar' },
					{ name: 'Bulgarian', value: 'bg' },
					{ name: 'Czech', value: 'cs' },
					{ name: 'Danish', value: 'da' },
					{ name: 'German', value: 'de' },
					{ name: 'Greek', value: 'el' },
					{ name: 'English', value: 'en-us' },
					{ name: 'Spanish', value: 'es' },
					{ name: 'Finnish', value: 'fi' },
					{ name: 'French', value: 'fr' },
					{ name: 'Hungarian', value: 'hu' },
					{ name: 'Italian', value: 'it' },
					{ name: 'Japanese', value: 'ja' },
					{ name: 'Korean', value: 'ko' },
					{ name: 'Lithuanian', value: 'lt' },
					{ name: 'Dutch', value: 'nl' },
					{ name: 'Polish', value: 'pl' },
					{ name: 'Portuguese', value: 'pt-pt' },
					{ name: 'Romanian', value: 'ro' },
					{ name: 'Russian', value: 'ru' },
					{ name: 'Slovak', value: 'sk' },
					{ name: 'Swedish', value: 'sv' },
					{ name: 'Turkish', value: 'tr' },
					{ name: 'Ukrainian', value: 'uk' },
					{ name: 'Chinese (simplified)', value: 'zh-hans' }
				))
		.addStringOption(option => 
			option.setName('source_language')
				.setDescription('The language of the text (optional)')
				.setRequired(false)
				.addChoices(
					{ name: 'Arabic', value: 'ar' },
					{ name: 'Bulgarian', value: 'bg' },
					{ name: 'Czech', value: 'cs' },
					{ name: 'Danish', value: 'da' },
					{ name: 'German', value: 'de' },
					{ name: 'Greek', value: 'el' },
					{ name: 'English', value: 'en-us' },
					{ name: 'Spanish', value: 'es' },
					{ name: 'Finnish', value: 'fi' },
					{ name: 'French', value: 'fr' },
					{ name: 'Hungarian', value: 'hu' },
					{ name: 'Italian', value: 'it' },
					{ name: 'Japanese', value: 'ja' },
					{ name: 'Korean', value: 'ko' },
					{ name: 'Lithuanian', value: 'lt' },
					{ name: 'Dutch', value: 'nl' },
					{ name: 'Polish', value: 'pl' },
					{ name: 'Portuguese', value: 'pt-pt' },
					{ name: 'Romanian', value: 'ro' },
					{ name: 'Russian', value: 'ru' },
					{ name: 'Slovak', value: 'sk' },
					{ name: 'Swedish', value: 'sv' },
					{ name: 'Turkish', value: 'tr' },
					{ name: 'Ukrainian', value: 'uk' },
					{ name: 'Chinese (simplified)', value: 'zh-hans' }
				)),
	async execute(interaction) {
		const text = interaction.options.getString('text');
		const targetLanguage = interaction.options.getString('target_language');
		const sourceLanguage = interaction.options.getString('source_language') || null;

		try {
			const result = await translator.translateText(text, sourceLanguage, targetLanguage);
			
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Translation Result')
                .setThumbnail('https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/language-translation-icon.png')
				.setDescription(`**Original Text:** ${text}\n\n**Translated Text:** ${result.text}`)
				.setTimestamp()
				.setFooter({ text: 'LinguaBot' });

			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			await interaction.reply('There was an error with the translation. Please try again later.');
		}
	},
};
