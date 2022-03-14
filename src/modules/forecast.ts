import axios from "axios";
import { CommandInteraction } from "discord.js";
import { getGuildLocation } from "../config/redis.conf";
import dotenv from "dotenv"

dotenv.config()

export const forecastMethod = async(interaction: CommandInteraction) => {
    const location = interaction.options.get("location")?.value;
    await interaction.reply("Fetching data...")
    if(location){
        fetchForecast(interaction, String(location))
    }else{
        let cachedLocation = await getGuildLocation(String(interaction.guildId));
    if(cachedLocation){
      fetchForecast(interaction, String(cachedLocation))
    }else{
      await interaction.editReply("Please include a location or specify the servers default location with /weather-setting (This can only do the admin)")
    }
    }
}

const fetchForecast = (interaction: CommandInteraction, location: string)=>{
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${location}&days=3&aqi=no&alerts=no`)
    .then(async(res)=>{
        const body = res.data;
        const forecast = body.forecast.forecastday
        await interaction.editReply({
            content: `3 days weather forecast for ${body.location.name}, ${body.location.country}`
        })
        for (let i = 0; i < forecast.length; i++) {
            const element = forecast[i];
            await interaction.channel?.send({
                content: `-------------${element.date}-------------\n\n${element.day.condition.text}\n\nAverage temperature: ${element.day.avgtemp_c}°C | ${element.day.avgtemp_f}°F \nMax wind: ${element.day.maxwind_kph}kph | ${element.day.maxwind_mph}mph\nAverage humidity: ${element.day.avghumidity}%\nRain possibility: ${element.day.daily_chance_of_rain}%\nSnow possibility: ${element.day.daily_chance_of_snow}%`,
                files: ["http:"+ element.day.condition.icon]
            })
            
        }
    })
}