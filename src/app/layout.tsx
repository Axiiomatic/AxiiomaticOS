import type { Metadata } from "next";
import localFont from "next/font/local";
import config from "@/../config.json";
import { ThemeProvider, CameraProvider, PageHistoryProvider, CommandHistoryProvider } from "@/utils/contexts";
import "@/styles/global.css";

const hackNF = localFont({
  src: "./fonts/Hack-NF.ttf",
  variable: "--font-hack-nf",
  weight: "100 900",
});
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
    <html lang="en">
      <body
        className={`${vt323.variable} antialiased`}
      >
        <ThemeProvider>
          <CameraProvider>
            <PageHistoryProvider>
              <CommandHistoryProvider>
                {children}
              </CommandHistoryProvider>
            </PageHistoryProvider>
          </CameraProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
