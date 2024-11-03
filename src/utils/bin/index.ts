import { commands } from './commands';
import { api_commands } from './api_commands';

const unsortedBin: Record<string, any> = {
    ...commands,
    ...api_commands
}

const sortedBin: Record<string, any> = {};

Object.keys(unsortedBin).sort().forEach(key => {
    sortedBin[key] = unsortedBin[key];
  });

export const bin = sortedBin;