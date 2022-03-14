import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.on("ready", () => console.log("Connected!"));

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand())return;
    console.log(interaction)
    const {commandName} = interaction;
    if(commandName === "ping"){
        await interaction.reply("Yes sir!")
    }else if(commandName === "current"){
        await interaction.reply("Bad")
    }
})

client.login(process.env.BOT_TOKEN);