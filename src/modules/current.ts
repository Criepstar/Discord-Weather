import { CommandInteraction } from "discord.js";
import axios from "axios";
import dotenv from "dotenv";
import { getGuildLocation } from "../config/redis.conf";

dotenv.config();

export const currentWeatherMethod = async (interaction: CommandInteraction) => {
  const location = interaction.options.get("location")?.value;
  await interaction.reply("Fetching data...");
  if(location){
      fetchData(interaction, String(location))
  }else{
    let cachedLocation = await getGuildLocation(String(interaction.guildId));
    console.log(cachedLocation)
    if(cachedLocation){
      fetchData(interaction, String(cachedLocation))
    }else{
      await interaction.editReply("Please include a location or specify the servers default location with /weather-setting (This can only do the admin)")
    }
  }
};

const fetchData = async(interaction: CommandInteraction, location: string)=>{
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}&aqi=no`
        )
        .then(async (res) => {
          const body = res.data;
          console.log(body.current.condition.icon);
          const current = body.location.localtime;
          const time = current.substr(current.length - 5);
          await interaction.editReply({
            content: `Weather in ${body.location.name}, ${body.location.country} at ${time}\n\n${body.current.condition.text}\n\nTemperature: ${body.current.temp_c}°C | ${body.current.temp_f}°F \nWind: ${body.current.wind_kph}kph | ${body.current.wind_mph}mph - Direction: ${body.current.wind_dir}\nHumidity: ${body.current.humidity}%\nRain: ${body.current.precip_mm}mm | ${body.current.precip_in}in`,
            files: ["http:" + body.current.condition.icon],
          });
        });
}
