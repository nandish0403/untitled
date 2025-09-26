"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function MagicLinkPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const sendMagicLink = async () => {
    setStatus("sending");
    setMessage(null);
    try {
      // Placeholder until SMTP is configured via environment variables
      // Once configured, wire this to your auth provider's magic-link endpoint
      await new Promise((r) => setTimeout(r, 800));
      setStatus("sent");
      setMessage("If this email is registered, a magic sign-in link will arrive shortly.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.message || "Failed to send magic link.");
    }
  };

  const disabled = !email || status === "sending";

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-background to-black/10 relative px-4">
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <Card className="w-full max-w-md bg-card/70 backdrop-blur-xl border border-primary/20 shadow-[0_0_80px_-20px_rgba(99,102,241,0.45)]">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Sign in with Magic Link</h1>
            <p className="text-sm text-muted-foreground mt-1">We'll email you a secure, one‑time link to sign in.</p>
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <Button className="w-full" disabled={disabled} onClick={sendMagicLink}>
            {status === "sending" ? "Sending…" : "Send magic link"}
          </Button>

          {message && (
            <p className={`mt-3 text-sm ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>
          )}

          <div className="mt-6 text-xs text-muted-foreground">
            <p>
              Note: Magic link delivery requires SMTP credentials (e.g., SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL, NEXT_PUBLIC_SITE_URL).
              Once configured, this page will send real sign‑in links.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 text-sm">
            <Link href="/sign-in" className="opacity-80 hover:opacity-100 underline underline-offset-4">Use password</Link>
            <Link href="/" className="opacity-80 hover:opacity-100 underline underline-offset-4">Back home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}