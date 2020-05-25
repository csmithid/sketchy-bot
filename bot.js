require("dotenv").config();
var _ = require("lodash");
const words = require("./words.json");
const discord = require("discord.js");
const client = new discord.Client();
const schedule = require("node-schedule");
var natural = require("natural");
const a = require("indefinite");

console.log(process.env.BOT_TOKEN);

client.on("ready", async () => {
  console.log("Sketchybot is ready to draw!");
  console.log(client.channels);
  try {
    channel = await client.channels.fetch("713459935836635218");
    //channel.send("Sketchy-bot is rebooted!");
  } catch (err) {
    console.log(err);
  }
  scheduleMessage();
});

const scheduleMessage = () => {
  const dailyMessage = schedule.scheduleJob("0 12 * * *", async () => {
    console.log("Posting a new challenge.");
    try {
      channel = await client.channels.fetch("713459935836635218");
      channel.send(
        `@here ✒ The daily challenge: try drawing ${a(getRandomItem())}!`
      );
    } catch (err) {
      console.log(err);
    }
  });
};

client.on("message", (msg) => {
  if (
    natural.JaroWinklerDistance(msg.content, "Should I sketch every day?") >=
    0.9
  ) {
    msg.reply("yes.");
  }
});

client.on("message", (msg) => {
  if (natural.JaroWinklerDistance(msg.content, "What should I draw?") >= 0.9) {
    msg.reply(`try drawing ${a(getRandomItem())}!`);
  }
});

const getRandomItem = () => {
  return words.nouns[_.floor(_.random(0, words.nouns.length - 1))];
};

client.login(process.env.BOT_TOKEN);
