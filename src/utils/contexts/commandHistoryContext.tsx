"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { CommandHistoryContextInterface } from './ContextInterfaces';

interface Props {
    children?: ReactNode
}

const CommandHistoryContext = createContext<CommandHistoryContextInterface>({
    previousCommands: [],
    commandIndex: 0,
    setCommandIndex: () => {},
    updateCommandHistory: () => {}
});

export const CommandHistoryProvider = ({ children } : Props) => {
    const [previousCommands, setPreviousCommands] = useState<string[]>([]);
    const [commandIndex, setCommandIndex] = useState(0);

    const updateCommandHistory = (newCommand : string) => {
        setCommandIndex(previousCommands.length+1);
        setPreviousCommands((prev) => [...prev, newCommand]);
    };

    return (
        <CommandHistoryContext.Provider value={{
            previousCommands,
            commandIndex,
            setCommandIndex,
            updateCommandHistory
        }}>
            {children}
        </CommandHistoryContext.Provider>
    );
};

export const useCommandHistory = () => useContext(CommandHistoryContext);
