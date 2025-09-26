"use client"
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// Simple Web Speech API voice command controller
// Commands:
// - "open dashboard"
// - "create meeting"
// - "join meeting"
// - "open history"
// - "toggle dark"
export function VoiceCommand() {
  const recRef = useRef<any>(null);
  const [active, setActive] = useState(false);
  const [last, setLast] = useState<string>("");

  useEffect(() => {
    const SR: any = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (e: any) => {
      const txt = Array.from(e.results).map((r: any) => r[0].transcript).join(" ").toLowerCase();
      setLast(txt);
      handleCommand(txt);
    };
    recognition.onend = () => {
      if (active) recognition.start();
    };
    recRef.current = recognition;
    return () => {
      try { recognition.stop(); } catch {}
    };
  }, [active]);

  const handleCommand = (text: string) => {
    const go = (path: string) => {
      if (typeof window !== "undefined") window.location.href = path;
    };
    if (text.includes("open dashboard")) go("/dashboard");
    else if (text.includes("create meeting")) go("/meet/new");
    else if (text.includes("join meeting")) go("/meet/join");
    else if (text.includes("open history")) go("/history");
    else if (text.includes("toggle dark")) document.documentElement.classList.toggle("dark");
  };

  const toggle = () => {
    const rec = recRef.current;
    if (!rec) return;
    if (active) {
      try { rec.stop(); } catch {}
      setActive(false);
    } else {
      try { rec.start(); setActive(true); } catch {}
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant={active ? "secondary" : "outline"} onClick={toggle} className="gap-2">
        {active ? "Listening…" : "Voice commands"}
      </Button>
      {last && <span className="text-xs text-muted-foreground max-w-[200px] truncate" title={last}>{last}</span>}
    </div>
  );
}

export default VoiceCommand;