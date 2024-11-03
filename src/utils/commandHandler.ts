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


    if (handler.usesContext) {
      if (!handler.validArgs || handler.validArgs.length > 0) return handler.func(context, args);
      return handler.func(context);
    }

    if (!handler.validArgs || handler.validArgs.length > 0) return handler.func(args);
    return handler.func();

  } catch (error) {
    console.error(`Error executing command ${command}:`, error);
    return `Error executing command: ${command}`;
  }
}; 