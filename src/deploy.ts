import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";

import {commands} from "./config/commands.conf"

dotenv.config();

export const initCommands = (serverID: string) =>{
    const rest = new REST({version: "9"}).setToken(String(process.env.BOT_TOKEN));
    rest.put(Routes.applicationGuildCommands(String(process.env.APP_ID) ,serverID), {body: commands})
    .then(()=>console.log("Successfully registered"))
    .catch(console.error)
}
