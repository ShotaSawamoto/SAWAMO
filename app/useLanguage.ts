"use client";

import { useEffect, useState } from "react";

export type Language = "ja" | "en";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "ja";
    const saved = window.localStorage.getItem("kts-language");
    return saved === "en" ? "en" : "ja";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("kts-language", language);
  }, [language]);

  const toggleLanguage = () => setLanguage((current) => current === "ja" ? "en" : "ja");

  return { language, toggleLanguage };
}
