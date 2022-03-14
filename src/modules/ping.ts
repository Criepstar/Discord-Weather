import axios from "axios";
import { CommandInteraction } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

export const pingMethod = async(interaction: CommandInteraction) =>{
    await interaction.reply("Fetching data...")
    axios.get(`https://api.weatherapi.com/v1/timezone.json?key=${process.env.API_KEY}&q=Berlin`)
    .then(async(res)=>{
        await interaction.editReply("No problems detected")
    }).catch(async(err)=>{
        await interaction.editReply("An error occured")
    })
}