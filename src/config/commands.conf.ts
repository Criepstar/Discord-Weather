import { SlashCommandBuilder } from "@discordjs/builders";

export const commands = [
  new SlashCommandBuilder()
    .setName("current")
    .setDescription("Get current weather")
    .setDescription("Get current weather")
    .addStringOption((option) =>
      option.setName("location").setDescription("Your location")
    ),
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("See if API is working"),
  new SlashCommandBuilder()
    .setName("weather-setting")
    .setDescription("Config bot settings. Only admins can do this")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("default")
        .setDescription("Set the default location for the weather commands")
        .addStringOption((option) =>
          option.setName("location").setDescription("Your default location")
        )
    ),
  new SlashCommandBuilder()
    .setName("forecast")
    .setDescription("Get the forecast for the next 3 days")
    .addStringOption((option) =>
      option.setName("location").setDescription("Your location")
    ),
].map((command) => command.toJSON());
