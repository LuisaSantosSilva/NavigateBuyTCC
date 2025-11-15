// app/layout.tsx
"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../components/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // carrega preferencia salva ou usa preferencia do sistema
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    }

    // sincroniza tema entre abas
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = (e.newValue as "light" | "dark") || "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <html lang="pt-BR" className={theme === "dark" ? "dark" : ""}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
