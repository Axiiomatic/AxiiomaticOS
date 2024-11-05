"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { ComputerContextInterface } from './ContextInterfaces';

interface Props {
    children?: ReactNode
}

const ComputerContext = createContext<ComputerContextInterface>({
    state: 'title',
    setState: (newState: string) => { },
});

export const ComputerProvider = ({ children } : Props) => {
    const [state, setState] = useState('title');

    return (
        <ComputerContext.Provider value={{
            state,
            setState
        }}>
            {children}
        </ComputerContext.Provider>
    );
};

export const useComputer = () => useContext(ComputerContext);
