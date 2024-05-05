// Permet de trigger un événement
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "trigger",
  description: "Permet de trigger un événement.",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: "Administrator",
  options: [
    {
      name: "event",
      description: "L'événement à trigger.",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        {
          name: "guildMemberAdd",
          value: "guildMemberAdd",
        },
        {
          name: "interactionCreate",
          value: "interactionCreate",
        },
        {
          name: "messageCreate",
          value: "messageCreate",
        },
        {
          name: "messageDelete",
          value: "messageDelete",
        },
        {
          name: "ready",
          value: "ready",
        },
        {
          name: "voiceStateUpdate",
          value: "voiceStateUpdate",
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    try {
      const event = interaction.options.getString("event");

      client.emit(event, interaction);

      return interaction.reply({
        content: `L'événement \`${event}\` a été trigger.`,
        ephemeral: true,
      });
    } catch {
      return interaction.reply({
        content: `Désolé, je n'ai pas pu trigger l'événement.`,
        ephemeral: true,
      });
    }
  },
};
