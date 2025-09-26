"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function randomCode(len = 9) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: len }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

export default function NewMeetingPage() {
  const router = useRouter();

  useEffect(() => {
    const id = randomCode();
    const t = setTimeout(() => router.replace(`/meet/${id}`), 900);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen grid place-items-center px-6 sm:px-10 py-16 bg-gradient-to-br from-background to-black/10">
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-primary/20">
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Spinning up your holographic room…</h1>
          <p className="text-sm text-muted-foreground mt-2">Generating secure code and preparing WebRTC.</p>
          <div className="mt-6">
            <Button onClick={() => router.back()} variant="secondary">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}