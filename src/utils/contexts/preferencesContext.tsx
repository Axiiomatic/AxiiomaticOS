"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { PreferencesContextInterface } from './ContextInterfaces';
import config from "@/../config.json";

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
    const [theme, setTheme] = useState<object>(config.themes.classic);
    const [username, setUsername] = useState<string>(config.console_user);
    const [typingSpeed, setTypingSpeed] = useState<number>(config.typing_speed);

    return (
        <PreferencesContext.Provider value={{
            theme, setTheme, username, setUsername, typingSpeed, setTypingSpeed
        }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => useContext(PreferencesContext);
