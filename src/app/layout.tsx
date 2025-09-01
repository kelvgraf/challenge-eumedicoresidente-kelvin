import "@/styles/globals.css";

import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/app/components/header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "Boilerplate",
  description: "Site do Boilerplate",
};

async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className={poppins.variable} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
