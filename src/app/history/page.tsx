"use client"
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { History, Search, BarChart3 } from "lucide-react";

type Meeting = { id: string; title: string; date: string; durationMin: number; attendees: number; summary: string };

const mockMeetings: Meeting[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `MTG-${(1000 + i).toString()}`,
  title: ["Design Sync", "Standup", "Client Review", "All‑hands"][i % 4] + ` #${i+1}`,
  date: new Date(Date.now() - i * 86400000).toISOString(),
  durationMin: 20 + ((i * 7) % 50),
  attendees: 2 + (i % 7),
  summary: "Discussed roadmap, captured action items, and followed up on blockers.",
}));

export default function HistoryPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return mockMeetings.filter(m => `${m.id} ${m.title} ${m.summary}`.toLowerCase().includes(term));
  }, [q]);

  const avgDuration = Math.round(filtered.reduce((a, b) => a + b.durationMin, 0) / Math.max(filtered.length, 1));
  const totalAttendees = filtered.reduce((a, b) => a + b.attendees, 0);

  return (
    <div className="min-h-screen px-6 sm:px-10 py-10 bg-gradient-to-br from-background to-black/10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2"><History className="h-6 w-6"/> Meeting history</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="AI search transcripts, titles, actions…" className="pl-8 w-72" value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>
          <Button variant="secondary" onClick={() => setQ("")}>Clear</Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card className="bg-card/60 border border-primary/20"><CardContent className="p-4"><div className="text-xs text-muted-foreground">Avg duration</div><div className="text-2xl font-semibold mt-1">{avgDuration}m</div></CardContent></Card>
        <Card className="bg-card/60 border border-primary/20"><CardContent className="p-4"><div className="text-xs text-muted-foreground">Meetings</div><div className="text-2xl font-semibold mt-1">{filtered.length}</div></CardContent></Card>
        <Card className="bg-card/60 border border-primary/20"><CardContent className="p-4"><div className="text-xs text-muted-foreground">Total attendees</div><div className="text-2xl font-semibold mt-1">{totalAttendees}</div></CardContent></Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((m) => (
            <Card key={m.id} className="bg-card/60 border border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{new Date(m.date).toLocaleString()} • {m.durationMin}m • {m.attendees} attendees</div>
                    <p className="text-sm mt-2 text-muted-foreground">{m.summary}</p>
                  </div>
                  <Button size="sm" variant="secondary">Open</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="bg-card/60 border border-primary/20 p-4">
          <div className="flex items-center gap-2 font-medium mb-2"><BarChart3 className="h-4 w-4"/> Analytics</div>
          <div className="h-40 rounded-lg bg-[linear-gradient(90deg,oklch(0.85_0.2_264/.25),transparent),linear-gradient(0deg,oklch(0.95_0_0/.6),transparent)] relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-12 gap-1 p-2">
              {Array.from({length:12}).map((_,i)=> (
                <div key={i} className="bg-primary/50 rounded" style={{height: `${20 + ((i*17)%70)}%`}} />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">AI-powered trends visualization (demo).</p>
        </Card>
      </section>
    </div>
  );
}