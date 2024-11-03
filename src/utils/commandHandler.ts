import { ThemeContextInterface } from "./contexts";
import { commands } from "@/commands";

export const executeCommand = (cmd: string, context: ThemeContextInterface): string => {
  const [command, ...args] = cmd.trim().split(/\s+/);

  const handler = (commands as Record<string, any>)[command];

  if (!handler) {
    return `'${command}' is not recognized as a valid command`;
  }

  try {
    if (handler.validArgs && args.length > 0) {
      let response = '';
      if (args.some((arg) => {
        const included = handler.validArgs.includes(arg)
        if (!included) {
          response += `Invalid argument '${arg}' for command '${command}'.\n`;
          return true;
        }
      })) return response;
    }

    return handler.func(context, args);
  } catch (error) {
    console.error(`Error executing command ${command}:`, error);
    return `Error executing command: ${command}`;
  }
}; 