const mysql = require("mysql");

require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "s6008_discord_bot",
});

connection.connect(function (err) {
  if (err) {
    console.error(err.stack);
    return;
  }

  console.log(`Connecté à la base de données ${connection.threadId}`);
});

module.exports = connection;
