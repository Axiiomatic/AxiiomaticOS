"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PreferencesContextInterface } from './ContextInterfaces';
import config from "@/../config.json";

interface Theme {
    textColor: string;
    bgColor: string;
}

interface Props {
    children?: ReactNode
}

const PreferencesContext = createContext<PreferencesContextInterface>({
    theme: config.themes.classic,
    setTheme: () => {},
    username: config.console_user,
    setUsername: () => {},
    typingSpeed: config.typing_speed,
    setTypingSpeed: () => {}
});

export const PreferencesProvider = ({ children } : Props) => {
    const [theme, setTheme] = useState<Theme>(config.themes.classic);
    const [username, setUsername] = useState<string>(config.console_user);
    const [typingSpeed, setTypingSpeed] = useState<number>(config.typing_speed);

    useEffect(() => {
        document.documentElement.style.setProperty('--color', theme.textColor);
    }, [theme]);

    return (
        <PreferencesContext.Provider value={{
            theme, setTheme, username, setUsername, typingSpeed, setTypingSpeed
        }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => useContext(PreferencesContext);
