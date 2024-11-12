import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { usePreferences, useCommandHistory } from "@/utils/contexts";
import { executeCommand } from "@/utils/commandHandler";
import { tabCompletion } from "@/utils/tabCompletion";
import config from "@/../config.json";
import { welcome } from '@/paraglide/messages';
import { useRouter } from "@/lib/i18n";

const CLIHook = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const [inputEditable, setInputEditable] = useState<boolean>(true);
  const [lastKey, setLastKey] = useState<string>('');
  const [keyStreak, setKeyStreak] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([welcome()]);

  const inputRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const preferencesContext = usePreferences();
  const { previousCommands, commandIndex, setCommandIndex, updateCommandHistory } = useCommandHistory();

  const scrollToBottom = () => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  };

  const handleInput = (e : React.KeyboardEvent<HTMLDivElement>) => {
    let keyS = keyStreak;
    if (e.key === lastKey) keyS++;
    else keyS = 0;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.keyCode === 35 || e.keyCode === 36) {
      e.preventDefault();
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const [newInput, newSuggestions] = tabCompletion(input.toLowerCase(), lastKey, keyS, suggestions);
      setSuggestions(newSuggestions);
      setInput(newInput);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.max(commandIndex-1, 0);
      setInput(previousCommands[newIndex] || '');
      setCommandIndex(newIndex);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex < previousCommands.length) {
        const newIndex = Math.min(commandIndex+1, previousCommands.length-1);
        setInput(previousCommands[newIndex] || '');
        setCommandIndex(newIndex);
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default line break
      
      if (!inputRef.current) return;

      if (!inputRef.current.textContent) return;
      
      if (inputRef.current.textContent.trim() !== '') {
        processCommand(inputRef.current.textContent.trim());
        inputRef.current.textContent = ''; // Clear the content
        setInput('');
      }
    }

    setLastKey(e.key);
    setKeyStreak(keyS);
    scrollToBottom();
  };

  const keepFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      // Move cursor to end for contentEditable div
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(inputRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }

    return () => {
    };
  }, [input]);

  useEffect(() => {
    keepFocus(); // Keep focus on input field after processing command
});

  useLayoutEffect(() => {
    scrollToBottom(); // Scroll immediately after DOM updates
  }, [output]); // Depend on `output` array

  const processCommand = async (cmd: string) => {
    updateCommandHistory(cmd);
    setInputEditable(false);
    const response = await executeCommand(cmd.toLowerCase(), preferencesContext);
    setInputEditable(true);
    switch (response) {
      case "CLEAR":
        setOutput([]);
        break;
      case "QUIT":
        router.push("/os");
        break;
      case "GUI":
        router.push("/os/gui");
        break;
      default:
        setOutput([...output, `$ ${config.console_host}@${preferencesContext.username} > ${cmd}`, response]);
        break;
    }
  };

    return {
        input,
        setInput,
        output,
        setOutput,
        inputEditable,
        setInputEditable,
        inputRef,
        outputRef,
        handleInput,
        keepFocus,
        processCommand,
        scrollToBottom
    };
};

export default CLIHook;
