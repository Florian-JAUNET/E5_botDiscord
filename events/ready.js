const { ActivityType } = require("discord.js");
const client = require("..");
const chalk = require("chalk");

client.on("ready", () => {
  const activities = [
    { name: `préparer l'épreuve E5`, type: ActivityType.Playing },
  ];
  const status = [
    // "online",
    // "dnd",
    "idle",
  ];

  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0;
    client.user.setActivity(activities[i]);
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if (s >= activities.length) s = 0;
    client.user.setStatus(status[s]);
    s++;
  }, 30000);

  console.log(chalk.red(`Connecté en tant que ${client.user.tag} !`));
});
