"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/ThemeToggle";
import FuturisticBackground from "@/components/FuturisticBackground";
import { Sparkles, Video, History, LogIn, ArrowRight, Mic, Satellite } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    // nothing for now
  }, []);

  const isAuthed = !!session?.user;

  const heroSubtitle = useMemo(
    () => (
      "Futuristic, mind‑bending video collaboration with realtime captions, ASL overlay, and AI‑assisted controls."
    ),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background to-black/10">
      <FuturisticBackground />
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 ring-1 ring-primary/30 backdrop-blur-sm grid place-items-center">
            <Satellite className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold tracking-tight text-lg">NeonMeet</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthed ? (
            <Button variant="default" onClick={() => router.push("/dashboard")}>Dashboard</Button>
          ) : (
            <Button asChild>
              <Link href="/sign-in" className="inline-flex items-center gap-2"><LogIn className="h-4 w-4" /> Sign in</Link>
            </Button>
          )}
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 pt-8 sm:pt-16 pb-24">
        <section className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-[conic-gradient(at_50%_0%,_oklch(0.92_0.2_264)_0%,_oklch(0.85_0.13_200)_35%,_oklch(0.95_0.18_16)_70%,_oklch(0.98_0_0)_100%)] drop-shadow-[0_0_18px_rgba(80,80,255,0.25)]">
            Holographic Video Chat for the Next Era
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
            {isAuthed ? (
              <>
                <Button size="lg" className="gap-2" onClick={() => router.push("/dashboard")}>
                  <Sparkles className="h-4 w-4" /> Open Dashboard
                </Button>
                <Card className="w-full sm:w-auto bg-card/70 backdrop-blur-xl border border-primary/20 shadow-[0_0_60px_-15px_rgba(99,102,241,0.45)]">
                  <CardContent className="p-2 sm:p-3">
                    <form
                      className="flex items-center gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (joinCode.trim()) router.push(`/meet/${joinCode.trim()}`);
                      }}
                    >
                      <Input placeholder="Enter meeting code" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} className="w-48" />
                      <Button type="submit" variant="secondary" className="gap-2">
                        Join <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/sign-in"><Sparkles className="h-4 w-4" /> Get started</Link>
                </Button>
                <Button variant="secondary" size="lg" className="gap-2" onClick={() => router.push("/dashboard")}>Explore demo <ArrowRight className="h-4 w-4" /></Button>
              </>
            )}
          </div>
        </section>

        <section className="mt-14 grid sm:grid-cols-3 gap-6">
          <FeatureCard icon={<Video className="h-5 w-5" />} title="Live Calls"
            subtitle="Ultra-low latency WebRTC with spatial audio and crystal visuals." />
          <FeatureCard icon={<Mic className="h-5 w-5" />} title="Realtime Captions"
            subtitle="On‑device speech to text with multilingual subtitles and export." />
          <FeatureCard icon={<History className="h-5 w-5" />} title="Meeting Memory"
            subtitle="AI summaries, timelines, and searchable transcripts." />
        </section>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          Background video courtesy of Unsplash. Interface built with Shadcn/UI and Tailwind.
        </div>
      </main>

      <footer className="relative z-10 px-6 sm:px-10 pb-10 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} NeonMeet</span>
        <a className="text-xs underline underline-offset-4 opacity-80 hover:opacity-100" href="https://unsplash.com" target="_blank" rel="noreferrer">Unsplash</a>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <Card className="group bg-card/60 border border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-xl overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_200px_at_var(--x,_50%)_var(--y,_50%),_oklch(0.85_0.2_264/.25),_transparent_40%)]" />
      <CardContent className="relative p-6">
        <div className="h-10 w-10 rounded-md bg-primary/15 text-primary grid place-items-center ring-1 ring-primary/40">
          {icon}
        </div>
        <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}