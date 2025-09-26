"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function JoinMeetingPage() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const join = () => {
    const id = code.trim().replace(/\s+/g, "");
    if (!id) return;
    router.push(`/meet/${id}`);
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 sm:px-10 py-16 bg-gradient-to-br from-background to-black/10">
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-primary/20">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">Join a meeting</h1>
          <p className="text-sm text-muted-foreground mt-1">Paste the code you received to warp into the room.</p>
          <div className="mt-6 space-y-3">
            <div>
              <Label htmlFor="code">Meeting code</Label>
              <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="ABC-123-XYZ" />
            </div>
            <Button className="w-full" onClick={join}>Join</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}