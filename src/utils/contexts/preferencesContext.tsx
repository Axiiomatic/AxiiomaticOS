"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PreferencesContextInterface } from './ContextInterfaces';
import { clamp } from '../functions';
import config from "@/../config.json";

interface Theme {
    textColor: string;
    bgColor: string;
}

interface Props {
    children?: ReactNode
}

const PreferencesContext = createContext<PreferencesContextInterface>({
    theme: config.themes.classic.name,
    setTheme: () => {},
    username: config.console_user,
    setUsername: () => {},
    typingSpeed: config.typing_speed,
    typingDelay: clamp(100-config.typing_speed, 1, 100),
    updateTypingSpeed: () => {}
});

export const PreferencesProvider = ({ children } : Props) => {
    const [theme, setTheme] = useState<string>(config.themes.classic.name);
    const [username, setUsername] = useState<string>(config.console_user);
    const [typingSpeed, setTypingSpeed] = useState<number>(config.typing_speed);
    const [typingDelay, setTypingDelay] = useState<number>(clamp(100-config.typing_speed, 1, 100));

    useEffect(() => {
        document.documentElement.style.setProperty('--color', config.themes[theme as keyof typeof config.themes].textColor);
        document.documentElement.style.setProperty('--bgColor', config.themes[theme as keyof typeof config.themes].bgColor);
    }, [theme]);

    const updateTypingSpeed = (newSpeed : number) => {
        setTypingSpeed(newSpeed);
        setTypingDelay(clamp(100-newSpeed, 1, 100));
    };

    return (
        <PreferencesContext.Provider value={{
            theme, setTheme, username, setUsername, typingSpeed, typingDelay, updateTypingSpeed
        }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => useContext(PreferencesContext);
