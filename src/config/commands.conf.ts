import { SlashCommandBuilder } from "@discordjs/builders";

export const commands = [
    new SlashCommandBuilder().setName("current").setDescription("Get current weather").setDescription("Get current weather"),
    new SlashCommandBuilder().setName("ping").setDescription("See if API is working")
].map(command => command.toJSON())