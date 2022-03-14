import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";

import {commands} from "./config/commands.conf"

dotenv.config();

const rest = new REST({version: "9"}).setToken(String(process.env.BOT_TOKEN));
rest.put(Routes.applicationGuildCommands("411947829741879296","592083979969232946"), {body: commands})
.then(()=>console.log("Successfully registered"))
.catch(console.error)
