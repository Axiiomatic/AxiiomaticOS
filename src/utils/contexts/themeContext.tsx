"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeContextInterface } from './ContextInterfaces';
import config from "@/../config.json";

interface Props {
    children?: ReactNode
}

const ThemeContext = createContext<ThemeContextInterface>({
    color: config.colors.classic,
    setColor: () => {},
    username: config.console_user,
    setUsername: () => {},
    typingSpeed: config.typing_speed,
    setTypingSpeed: () => {}
});

export const ThemeProvider = ({ children } : Props) => {
    const [color, setColor] = useState<object>(config.colors.classic);
    const [username, setUsername] = useState<string>(config.console_user);
    const [typingSpeed, setTypingSpeed] = useState<number>(config.typing_speed);

    return (
        <ThemeContext.Provider value={{
            color, setColor, username, setUsername, typingSpeed, setTypingSpeed
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
