import { usePreferences, PreferencesProvider } from "./preferencesContext";
import { useCamera, CameraProvider } from "./cameraContext";
import { usePageHistory, PageHistoryProvider } from "./pageHistoryContext";
import { useCommandHistory, CommandHistoryProvider } from "./commandHistoryContext";
import { useComputer, ComputerProvider } from "./computerContext";
import { PreferencesContextInterface, CameraContextInterface, PageHistoryContextInterface, CommandHistoryContextInterface, ComputerContextInterface } from "./ContextInterfaces";

export {
    usePreferences,
    PreferencesProvider,
    useCamera,
    CameraProvider,
    usePageHistory,
    PageHistoryProvider,
    useCommandHistory,
    CommandHistoryProvider,
    useComputer,
    ComputerProvider
};

export type {
    PreferencesContextInterface,
    CameraContextInterface,
    PageHistoryContextInterface,
    CommandHistoryContextInterface,
    ComputerContextInterface
};
