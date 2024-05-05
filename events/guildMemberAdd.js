const { EmbedBuilder } = require("discord.js");
const client = require("..");
const config = require("../config.json");
const con = require("../models/connexion");

client.on("guildMemberAdd", async (member) => {
  const welcomeChannel = member.guild.channels.cache.get(
    config.channels.text.welcome
  );
  // Ajout de l'utilisateur dans la base de données
  // Vérifiez d'abord si l'utilisateur existe déjà
  con.query(
    `SELECT * FROM user WHERE idDiscord = ?`,
    [member.user.id],
    (err, rows) => {
      if (err) throw err;

      if (rows.length < 1) {
        con.query(
          `INSERT INTO user (idDiscord, username) VALUES (?, ?)`,
          [member.user.id, member.user.username],
          (err) => {
            if (err) throw err;
          }
        );
      }
    }
  );

  const embed = new EmbedBuilder()
    .setTitle("Bienvenue")
    .setColor("Green")
    .setDescription(
      `Bienvenue sur le serveur ${member.guild.name}, ${member.user} !`
    );

  welcomeChannel.send({ embeds: [embed] });
});
