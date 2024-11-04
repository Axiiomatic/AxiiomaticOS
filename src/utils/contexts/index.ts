import { usePreferences, PreferencesProvider } from "./preferencesContext";
import { useCamera, CameraProvider } from "./cameraContext";
import { usePageHistory, PageHistoryProvider } from "./pageHistoryContext";
import { useCommandHistory, CommandHistoryProvider } from "./commandHistoryContext";
import { PreferencesContextInterface, CameraContextInterface, PageHistoryContextInterface, CommandHistoryContextInterface } from "./ContextInterfaces";

export {
    usePreferences,
    PreferencesProvider,
    useCamera,
    CameraProvider,
    usePageHistory,
    PageHistoryProvider,
    useCommandHistory,
    CommandHistoryProvider
};

export type {
    PreferencesContextInterface,
    CameraContextInterface,
    PageHistoryContextInterface,
    CommandHistoryContextInterface
};
