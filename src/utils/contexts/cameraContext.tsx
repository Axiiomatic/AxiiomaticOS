"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { CameraContextInterface } from './ContextInterfaces';

interface Props {
    children?: ReactNode
}

const CameraContext = createContext<CameraContextInterface>({
    cameraPosition: [],
    setCameraPosition: () => {},
    cameraRotation: [],
    setCameraRotation: () => {},
    cameraFov: 0,
    setCameraFov: () => {}
});

export const CameraProvider = ({ children } : Props) => {
    const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);
    const [cameraRotation, setCameraRotation] = useState([0, 0, 0]);
    const [cameraFov, setCameraFov] = useState(50);

    return (
        <CameraContext.Provider value={{
            cameraPosition,
            setCameraPosition,
            cameraRotation,
            setCameraRotation,
            cameraFov,
            setCameraFov
        }}>
            {children}
        </CameraContext.Provider>
    );
};

export const useCamera = () => useContext(CameraContext);
