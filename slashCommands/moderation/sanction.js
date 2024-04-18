const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const con = require("../../models/connexion");

module.exports = {
  name: "sanction",
  description: "Récupère les sanctions d'un utilisateur",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: "Administrator",
  options: [
    {
      name: "user",
      description: "L'utilisateur dont vous voulez voir les sanctions",
      type: 6,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.options.getMember("user");

    con.query(
      `SELECT idDiscord, reason, idDiscordModerator FROM warn WHERE idDiscord = ?`,
      [user.id],
      (err, rows) => {
        if (err) throw err;

        if (rows.length < 1) {
          return interaction.reply({
            content: "Aucune sanction trouvée",
            ephemeral: true,
          });
        }

        const embed = new EmbedBuilder()
          .setTitle("Avertissement(s) de l'utilisateur")
          .setColor("Blue")
          .setDescription(
            rows
              .map(
                (row) =>
                  `**Utilisateur : **<@${row.idDiscord}>\n\n**Raison : ** ${row.reason}\n\n**Modérateur : ** <@${row.idDiscordModerator}>`
              )
              .join("\n\n----------\n\n")
          );

        interaction.reply({ embeds: [embed] });
      }
    );
  },
};
