import { commands } from "@/commands";

export const tabCompletion = (input: string, lastKey : string, keyStreak : number, prevSuggestions : string[]): [string, string[]] => {
    const words = input.split(/\s+/);
    let lastWord = words[words.length-1];
    let args : string[] = [];
    let currentSuggestions : string[] = [];
    if (lastKey === 'Tab') currentSuggestions = prevSuggestions;
    else {
      if (words[0] in commands && words.length > 1) {
        const command = commands[words[0] as keyof typeof commands];
        if ('validArgs' in command) {
          if (words.length === 1) lastWord = '';
          args = command.validArgs;
        }
      }
      if (args.length === 0) currentSuggestions = Object.keys(commands).filter(cmd => cmd.startsWith(lastWord));
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