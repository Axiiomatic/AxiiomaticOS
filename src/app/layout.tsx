import { LanguageProvider } from "@inlang/paraglide-next"
import { languageTag } from "@/paraglide/runtime.js"
import type { Metadata } from "next";
import localFont from "next/font/local";
import config from "@/../config.json";
import { PreferencesProvider, CameraProvider, PageHistoryProvider, CommandHistoryProvider, ComputerProvider } from "@/utils/contexts";
import "./globals.css";

const vt323 = localFont({
  src: "./fonts/VT323-Regular.ttf",
  variable: "--font-vt323",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: config.title,
  description: config.description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
   <html lang={languageTag()}>
      <body
        className={`${vt323.variable} antialiased`}
      >
        <PreferencesProvider>
          <CameraProvider>
            <PageHistoryProvider>
              <CommandHistoryProvider>
                <ComputerProvider>
                  {children} 
                </ComputerProvider>
              </CommandHistoryProvider>
            </PageHistoryProvider>
          </CameraProvider>
        </PreferencesProvider>
      </body>
    </html>
 </LanguageProvider>
  );
}
