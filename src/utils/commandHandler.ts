import { PreferencesContextInterface } from "./contexts";
import { bin } from "@/utils/bin";
import { invalidCommand, invalidArg, commandError } from "@/paraglide/messages";

interface Handler {
  validArgs: string[];
  usesContext: boolean;
  func: (context?: PreferencesContextInterface | string[], args?: string[]) => Promise<string>;
}

export const executeCommand = async (cmd: string, context: PreferencesContextInterface): Promise<string> => {
  const [command, ...args] = cmd.trim().split(/\s+/);

  const handler: Handler = (bin as Record<string, Handler>)[command];
  console.log(handler);

  if (!handler) {
    return invalidCommand({ command: command});
  }

  try {
    if (handler.validArgs && args.length > 0) {
      let response = '';
      if (args.some((arg) => {
        const included = handler.validArgs.includes(arg);
        if (!included) {
          response += invalidArg({ arg: arg, command: command});
          return true;
        }
      })) return response;
    }


    if (handler.usesContext) {
      if (!handler.validArgs || handler.validArgs.length > 0) return await handler.func(context, args);
      return await handler.func(context);
    }

    if (!handler.validArgs || handler.validArgs.length > 0) return await handler.func(args);
    return await handler.func();

  } catch (error) {
    console.error(`Error executing command ${command}:`, error);
    return commandError({ command: command });
  }
}; 