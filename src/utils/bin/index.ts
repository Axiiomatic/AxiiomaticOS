import { commands } from './commands';
import { api_commands } from './api_commands';

const unsortedBin: Record<string, object> = {
  ...commands,
  ...api_commands
}

const sortedBin: Record<string, object> = {};

Object.keys(unsortedBin).sort().forEach(key => {
  sortedBin[key] = unsortedBin[key];
});

export const bin = sortedBin;
