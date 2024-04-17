const { EmbedBuilder, Collection, Message } = require("discord.js");
const client = require("..");
const config = require("../config.json");

client.on("messageDelete", async (message) => {
  if (message.channel.id === config.channels.text.logs) return;
  if (message.pinned) return;
  // Récupère le message supprimé et l'envoi dans les logs
  const embed = new EmbedBuilder()
    .setTitle("Message supprimé")
    .setDescription(
      `**Auteur :** ${message.author}
      \n**Contenu :** ${message.content} 
      \n**Salon :** ${message.channel}`
    )
    .setColor("Red")
    .setTimestamp();

  const channel = client.channels.cache.get(config.channels.text.logs);
  channel.send({ embeds: [embed] });
});
