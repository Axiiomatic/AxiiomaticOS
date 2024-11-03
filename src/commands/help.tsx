import { commands } from "./";

const func = (args: string[]) => {
    if (!args.length) {
        return Object.keys(commands).join(" ");
    }
    let response = '';

    args.forEach(command => response += `${command}: ${commands[command as keyof typeof commands].description}\n`);

    return response.trim();
};

export default {
    func,
    description: "Gives a list of available commands and their descriptions",
    validArgs: [
        "about",
        "amogus",
        "bing",
        "clear",
        "date",
        "duckduckgo",
        "echo",
        "education",
        "google",
        "help",
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
        "whoami",
        ":3"
    ]
};