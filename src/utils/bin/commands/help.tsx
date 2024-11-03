import { bin } from "../";

const func = async (args: string[]) => {
    if (!args.length) {
        return Object.keys(bin).join(" ");
    }
    let response = '';

    args.forEach(command => response += `${command}: ${bin[command as keyof typeof bin].description}\n`);

    return response.trim();
};

export default {
    func,
    description: "Gives a list of available commands and their descriptions",
    validArgs: [
        ":3",
        "about",
        "amogus",
        "bing",
        "clear",
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