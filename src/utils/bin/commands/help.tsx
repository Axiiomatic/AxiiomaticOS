import { bin } from "../";
import { languageTag } from "@/paraglide/runtime";

const func = async (args: string[]) => {
    if (!args.length) {
        return Object.keys(bin).join(" ");
    }
    let response = '';

    args.forEach(command => response += `${command}: ${bin[command as keyof typeof bin].description[languageTag()]}\n`);

    return response.trim();
};

export default {
    func,
    description: {
        "en": "Gives a list of available commands and their descriptions",
        "es": "Da una lista de los comandos disponibles y sus descripciones"
    },
    validArgs: [
        ":3",
        "about",
        "amogus",
        "bing",
        "clear",
        "curl",
        "currency",
        "date",
        "duckduckgo",
        "echo",
        "education",
        "google",
        "help",
        "ip",
        "languages",
        "projects",
        "readme",
        "reddit",
        "repo",
        "resume",
        "socials",
        "speed",
        "sumfetch",
        "theme",
        "username",
        "weather",
        "whoami"
    ]
};