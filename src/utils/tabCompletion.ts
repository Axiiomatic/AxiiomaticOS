import { bin } from "@/utils/bin";

interface Command {
  validArgs: string[];
}

export const tabCompletion = (input: string, lastKey : string, keyStreak : number, prevSuggestions : string[]): [string, string[]] => {
    const words = input.split(/\s+/);
    let lastWord = words[words.length-1];
    let args : string[] = [];
    let currentSuggestions : string[] = [];
    if (lastKey === 'Tab') currentSuggestions = prevSuggestions;
    else {
      if (words[0] in bin && words.length > 1) {
        const command = bin[words[0] as keyof typeof bin];
        if ('validArgs' in command) {
          if (words.length === 1) lastWord = '';
          args = (command as Command).validArgs;
        }
      }
      if (args.length === 0) currentSuggestions = Object.keys(bin).filter(cmd => cmd.startsWith(lastWord));
      else currentSuggestions = args.filter(cmd => cmd.startsWith(lastWord));
    }

    let newInput = input;
    if (currentSuggestions.length > 0) {
      let splitText = words;
      if (splitText[splitText.length - 1] !== '') splitText = splitText.slice(0, -1);
      newInput = [...splitText, currentSuggestions[keyStreak % currentSuggestions.length]].join(' ');
    }

    return [newInput, currentSuggestions];
}; 