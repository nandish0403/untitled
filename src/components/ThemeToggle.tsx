"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(false);
  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setDark(false);
    } else {
      root.classList.add("dark");
      setDark(true);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}