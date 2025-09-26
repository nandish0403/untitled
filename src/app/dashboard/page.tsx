"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Video, Plus, Keyboard, History } from "lucide-react";
import VoiceCommand from "@/components/VoiceCommand";

export default function DashboardPage() {
  const router = useRouter();
  const tips = useMemo(() => [
    "Tip: Press / to focus quick actions.",
    "Pro: Use voice commands (coming soon).",
    "New: ASL overlay can be pinned anywhere.",
  ], []);

  return (
    <div className="min-h-screen px-6 sm:px-10 py-10 bg-gradient-to-br from-background to-black/10">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Holographic Hub</h1>
        <VoiceCommand />
      </header>

      <section className="grid gap-6 sm:grid-cols-3">
        <ActionCard title="Create meeting" subtitle="Spin up a new room and share the code." icon={<Plus className='h-5 w-5' />} onClick={() => router.push("/meet/new")} />
        <ActionCard title="Join meeting" subtitle="Enter a code to warp into a room." icon={<Video className='h-5 w-5' />} onClick={() => router.push("/meet/join")} />
        <ActionCard title="Past meetings" subtitle="Browse transcripts, recordings, and notes." icon={<History className='h-5 w-5' />} onClick={() => router.push("/history")} />
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-3">
        {tips.map((t, i) => (
          <Card key={i} className="bg-card/60 backdrop-blur-xl border border-primary/20">
            <CardContent className="p-4 text-sm text-muted-foreground flex items-center gap-2">
              <Keyboard className="h-4 w-4" /> {t}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

function ActionCard({ title, subtitle, icon, onClick }: { title: string; subtitle: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <Card className="group bg-card/60 border border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-xl overflow-hidden relative will-change-transform [transform:perspective(900px)] hover:[transform:perspective(900px)_rotateX(2deg)_rotateY(-2deg)_translateY(-2px)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(600px_200px_at_var(--x,_50%)_var(--y,_50%),_oklch(0.85_0.2_264/.25),_transparent_40%)]" />
      <CardContent className="relative p-6">
        <div className="h-10 w-10 rounded-md bg-primary/15 text-primary grid place-items-center ring-1 ring-primary/40">{icon}</div>
        <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <Button className="mt-4" onClick={onClick}>Open</Button>
      </CardContent>
    </Card>
  );
}