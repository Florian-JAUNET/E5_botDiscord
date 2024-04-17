const fs = require("fs");
const chalk = require("chalk");
var AsciiTable = require("ascii-table");
var table = new AsciiTable();
table.setHeading("Models", "Stats").setBorder("|", "=", "0", "0");

module.exports = (client) => {
  fs.readdirSync("./models/")
    .filter((file) => file.endsWith(".js"))
    .forEach((model) => {
      require(`../models/${model}`);
      table.addRow(model.split(".js")[0], "✅");
    });
  console.log(chalk.greenBright(table.toString()));
};
