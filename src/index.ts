import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
import { setGuildLocation } from "./config/redis.conf";

import {initCommands} from "./deploy"
import { currentWeatherMethod } from "./modules/current";
import { forecastMethod } from "./modules/forecast";
import { pingMethod } from "./modules/ping";

dotenv.config();

const client = new Client({ intents: Intents.FLAGS.GUILDS });

client.on("ready", () => console.log("Connected!"));

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand())return;
    const {commandName} = interaction;
    if(commandName === "ping"){
        pingMethod(interaction)
    }else if(commandName === "current"){
        currentWeatherMethod(interaction);
    }else if(commandName === "forecast"){
        forecastMethod(interaction)
    }
    else if(commandName === "weather-setting"){
        const user = interaction.user.id
        const member = await interaction.guild?.members.fetch(user)
        if(member?.permissions.has("ADMINISTRATOR")){
            const subcommand = interaction.options.getSubcommand()
            if(subcommand === "default"){
                const location = interaction.options.get("location")?.value;
                if(location){
                    await setGuildLocation(String(interaction.guildId), String(location))
                    await interaction.reply("Saved!")
                }else{
                    await interaction.reply("Please specify a location")
                }
            }
        }else{
            await interaction.reply("You are not allowed to do this")
        }
    }
})

client.on("guildCreate", guild => {
    guild.systemChannel?.send(`Thank you for inviting me to ${guild.name}!`)
    initCommands(guild.id)
})

client.login(process.env.BOT_TOKEN);