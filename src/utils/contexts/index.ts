import { useTheme, ThemeProvider } from "./themeContext";
import { useCamera, CameraProvider } from "./cameraContext";
import { usePageHistory, PageHistoryProvider } from "./pageHistoryContext";
import { useCommandHistory, CommandHistoryProvider } from "./commandHistoryContext";
import { ThemeContextInterface, CameraContextInterface, PageHistoryContextInterface, CommandHistoryContextInterface } from "./ContextInterfaces";

export {
    useTheme,
    ThemeProvider,
    useCamera,
    CameraProvider,
    usePageHistory,
    PageHistoryProvider,
    useCommandHistory,
    CommandHistoryProvider
};

export type {
    ThemeContextInterface,
    CameraContextInterface,
    PageHistoryContextInterface,
    CommandHistoryContextInterface
};
