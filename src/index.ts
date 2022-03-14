import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.on("ready", () => console.log("Connected!"));

client.login(process.env.BOT_TOKEN);