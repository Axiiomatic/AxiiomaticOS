import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { usePreferences, useCommandHistory } from "@/utils/contexts";
import { executeCommand } from "@/utils/commandHandler";
import { tabCompletion } from "@/utils/tabCompletion";
import config from "@/../config.json";

const inputHook = () => {
  const [input, setInput] = useState<string>('');
  const [lastKey, setLastKey] = useState<string>('');
  const [keyStreak, setKeyStreak] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const [output, setOutput] = useState<string[]>([
`Welcome to AxiiomaticOS
Type 'help' to see a list of available commands
Type 'sumfetch' to display summary`
]);

  const [on, setOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadPrompt, setLoadPrompt] = useState<string | undefined>('/');
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [turnOn, setTurnOn] = useState<boolean>(false);
  const [turnOff, setTurnOff] = useState<boolean>(false);
  const [inputEditable, setInputEditable] = useState<boolean>(true);
  const inputRef = useRef<any>(null);
  const outputRef = useRef<any>(null);

  const preferencesContext = usePreferences();
  const { previousCommands, commandIndex, setCommandIndex, updateCommandHistory } = useCommandHistory();

  const scrollToBottom = () => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  };

  const handleInput = (e : any) => {
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
      if (inputRef.current?.textContent?.trim() !== '') {
        processCommand(inputRef.current.textContent.trim());
        inputRef.current.textContent = ''; // Clear the content
        setInput('');
      }
    }

    setLastKey(e.key);
    setKeyStreak(keyS);
    scrollToBottom();
  };

  const togglePower = (newPow : boolean) => {
    setOn(newPow);
  
    if (on) {
      // Reset loading state when toggling back on
      setTurnOff(true);
      setOutput([]);
      setLoading(true);
      setLoadingProgress(0);
    } else {
      setTurnOn(true);
    }
  };

  const keepFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {

      if (!on) return;
      setLoadingProgress((prev) => {
        if (prev >= 150) {
          setLoading(false);
          return 150; // Ensure it caps at 100%
        }
        if (prev >= 100) {
          return prev + 1;
        }
        return prev + 2*Math.random(); // Increase progress by 2% every 100ms
      });
    }, 60);

    const loadInterval = setInterval(() => {
      setLoadPrompt((prev) => {
        switch (prev) {
          case '/':
            return '-'
          case '-':
            return '\\'
          case '\\':
            return '/'
        }
      })
    }, 200)

    const turnOnOffTimeout = setTimeout(() => {
      setTurnOn(false)
      setTurnOff(false)
    }, 300); // Flash duration

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
      clearInterval(interval);
      clearInterval(loadInterval);
      clearTimeout(turnOnOffTimeout)
    };
  }, [on, input]);

  useEffect(() => {
    keepFocus(); // Keep focus on input field after processing command
}, [loading]);

  useLayoutEffect(() => {
    scrollToBottom(); // Scroll immediately after DOM updates
  }, [output]); // Depend on `output` array

  const processCommand = async (cmd: string) => {
    updateCommandHistory(cmd);
    setInputEditable(false);
    const response = await executeCommand(cmd.toLowerCase(), preferencesContext);
    if (response === "CLEAR") setOutput([]);
    else setOutput([...output, `$ ${config.console_host}@${preferencesContext.username} > ${cmd}`, response]);
    setInputEditable(true);
  };

    return {
        input,
        setInput,
        output,
        setOutput,
        on,
        setOn,
        loading,
        setLoading,
        loadPrompt,
        setLoadPrompt,
        loadingProgress,
        setLoadingProgress,
        turnOn,
        setTurnOn,
        turnOff,
        setTurnOff,
        inputEditable,
        setInputEditable,
        inputRef,
        outputRef,
        handleInput,
        togglePower,
        keepFocus,
        processCommand,
        scrollToBottom
    };
};

export default inputHook;