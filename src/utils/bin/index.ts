import { commands, commands_es } from './commands';
import { api_commands, api_commands_es } from './api_commands';

const unsortedBin: Record<string, any> = {
  ...commands,
  ...api_commands
}

const sortedBin: Record<string, any> = {};

Object.keys(unsortedBin).sort().forEach(key => {
  sortedBin[key] = unsortedBin[key];
});

const unsortedBin_es: Record<string, any> = {
  ...commands_es,
  ...api_commands_es
}

const sortedBin_es: Record<string, any> = {};

Object.keys(unsortedBin_es).sort().forEach(key => {
  sortedBin_es[key] = unsortedBin_es[key];
});

export const bin = sortedBin;
export const bin_es = sortedBin_es;
