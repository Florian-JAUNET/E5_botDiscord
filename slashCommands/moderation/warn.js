const { ApplicationCommandType, EmbedBuilder } = require("discord.js");
const con = require("../../models/connexion");
const config = require("../../config.json");

module.exports = {
  name: "warn",
  description: "Permet de warn un utilisateur.",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: "Administrator",
  options: [
    {
      name: "utilisateur",
      description: "L'utilisateur à warn.",
      type: 6,
      required: true,
    },
    {
      name: "raison",
      description: "La raison du warn.",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.options.getUser("utilisateur");
    const reason = interaction.options.getString("raison");
    const logChannel = client.channels.cache.get(config.channels.text.logs);

    con.query(
      `INSERT INTO warn (idDiscord, reason, idDiscordModerator) VALUES (?, ?, ?)`,
      [user.id, reason, interaction.user.id],
      (err) => {
        if (err) throw err;

        interaction.reply({
          content: `L'utilisateur ${user} a été warn pour la raison suivante : ${reason}, par ${interaction.user}.`,
          ephemeral: true,
        });

        logChannel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Warn")
              .setColor("Red")
              .setDescription(
                `L'utilisateur ${user} a été warn pour la raison suivante : ${reason}, par ${interaction.user}.`
              )
              .setTimestamp(),
          ],
        });
      }
    );
  },
};
