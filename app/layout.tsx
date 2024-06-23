import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({ 
  subsets: ["latin"],
  variable: "--font-sans", });

export const metadata: Metadata = {
  title: "ai-toggle-mode",
  description: "Prompt the llm to change between dark, light and system themes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          { children }
        </ThemeProvider>
      </body>
    </html>
  );
}
