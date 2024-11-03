import { ThemeContextInterface } from "@/utils/contexts";
import { commands } from "./";

const func = (context: ThemeContextInterface, args: string[]) => {
    if (!args.length) {
        return Object.keys(commands).join(" ");
    }
    let output = '';

    args.forEach(command => {
        if (command in commands && typeof commands[command as keyof typeof commands] === 'object') {
            output += `${command}: ${commands[command as keyof typeof commands].description}\n`;
        } else {
            output += `Command "${command}" not found.\n`;
        }
    });

    return output.trim();
};

const description = "Gives a list of available commands and their descriptions";

export default {
    func,
    description
};