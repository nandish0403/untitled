"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true); setError(null);
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/dashboard",
    });
    setLoading(false);
    if (error?.code) {
      setError(error.code);
    } else {
      router.push("/dashboard");
    }
  };

  const handleRegister = async () => {
    setLoading(true); setError(null);
    const { error } = await authClient.signUp.email({ email, name: name || email.split("@")[0], password });
    setLoading(false);
    if (error?.code) {
      setError(error.code);
    } else {
      await handleLogin();
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-background to-black/10 relative px-4">
      <div className="absolute top-4 right-4"><ThemeToggle /></div>
      <Card className="w-full max-w-md bg-card/70 backdrop-blur-xl border border-primary/20 shadow-[0_0_80px_-20px_rgba(99,102,241,0.45)]">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Welcome to NeonMeet</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to enter your futuristic dashboard.</p>
          </div>

          {mode === "register" && (
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" />
            </div>
          )}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="mb-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}

          <Button className="w-full mt-4" disabled={loading} onClick={mode === "login" ? handleLogin : handleRegister}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <div className="flex items-center justify-between mt-4 text-sm">
            <button className="underline underline-offset-4 opacity-80 hover:opacity-100" onClick={() => setMode(mode === "login" ? "register" : "login")}>{mode === "login" ? "Create account" : "Have an account? Sign in"}</button>
            <Link href="/" className="opacity-80 hover:opacity-100 underline underline-offset-4">Back home</Link>
          </div>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Prefer passwordless?</span>{" "}
            <Link href="/sign-in/magic" className="underline underline-offset-4">Use magic link</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}