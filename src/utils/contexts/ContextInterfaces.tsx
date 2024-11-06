import { Dispatch, SetStateAction } from 'react'; 

interface Theme {
    textColor: string;
    bgColor: string;
}

export interface CameraContextInterface {
    cameraPosition: number[]
    setCameraPosition: (position: number[]) => void
    cameraRotation: number[]
    setCameraRotation: (rotation: number[]) => void
    cameraFov: number
    setCameraFov: (fov: number) => void
}

export interface PageHistoryContextInterface {
    previousPage: string
    currentPage: string
    updatePageHistory: (newPage: string) => void
}

export interface ComputerContextInterface {
    state: string
    setState: (newState: string) => void
}

export interface CommandHistoryContextInterface {
    previousCommands: string[]
    commandIndex: number
    setCommandIndex: (index: number) => void
    updateCommandHistory: (newPage: string) => void
}

export interface PreferencesContextInterface {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
    username: string;
    setUsername: (username: string) => void;
    typingSpeed: number;
    setTypingSpeed: (speed: number) => void;
}