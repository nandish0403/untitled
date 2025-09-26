"use client"
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video as VideoIcon, VideoOff, Captions, Hand, ScreenShare, PhoneOff } from "lucide-react";

export default function MeetingRoom() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const localRef = useRef<HTMLVideoElement>(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [aslOn, setAslOn] = useState(true);
  const [subtitle, setSubtitle] = useState<string>("");
  const mediaStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        if (!mounted) return;
        mediaStream.current = stream;
        if (localRef.current) {
          localRef.current.srcObject = stream;
        }
      } catch (e) {
        console.warn("getUserMedia failed, using placeholder");
      }
    })();
    return () => {
      mounted = false;
      mediaStream.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  // Simple speech recognition for demo captions
  useEffect(() => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) return;
    let recognition: any;
    if (captionsOn) {
      recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (e: any) => {
        const t = Array.from(e.results).map((r: any) => r[0].transcript).join(" ");
        setSubtitle(t);
      };
      recognition.start();
    }
    return () => {
      try { recognition?.stop(); } catch {}
    };
  }, [captionsOn]);

  const toggleMic = () => {
    setMicOn((v) => {
      const next = !v;
      mediaStream.current?.getAudioTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  };
  const toggleCam = () => {
    setCamOn((v) => {
      const next = !v;
      mediaStream.current?.getVideoTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-background to-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold tracking-tight">Room {id}</h1>
          <Button variant="destructive" onClick={() => router.push("/dashboard")} className="gap-2"><PhoneOff className="h-4 w-4"/>Leave</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="relative aspect-video bg-black/60 overflow-hidden rounded-xl border border-primary/20 lg:col-span-2">
            {/* Local stream */}
            <video ref={localRef} autoPlay playsInline muted className="h-full w-full object-cover"/>
            {!camOn && (
              <div className="absolute inset-0 grid place-items-center text-muted-foreground">Camera off</div>
            )}
            {/* ASL overlay (demo) */}
            {aslOn && (
              <div className="absolute bottom-3 right-3 h-28 w-48 rounded-lg overflow-hidden border border-primary/30 bg-black/40 backdrop-blur-md grid place-items-center">
                <img alt="ASL interpreter" className="h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=640&q=80&auto=format&fit=crop" />
                <div className="absolute top-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium inline-flex items-center gap-1"><Hand className="h-3 w-3"/>ASL Live</div>
              </div>
            )}
            {/* Captions */}
            {captionsOn && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 max-w-[90%] px-3 py-1.5 rounded bg-black/70 text-white text-sm shadow-lg">{subtitle || "Listening…"}</div>
            )}
          </Card>

          {/* Right rail: participants / actions */}
          <div className="space-y-3">
            <Card className="p-4 bg-card/60 border border-primary/20">
              <h3 className="font-medium">Controls</h3>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Button variant={micOn ? "secondary" : "default"} onClick={toggleMic} className="gap-2">{micOn ? <Mic className="h-4 w-4"/> : <MicOff className="h-4 w-4"/>}{micOn ? "Mute" : "Unmute"}</Button>
                <Button variant={camOn ? "secondary" : "default"} onClick={toggleCam} className="gap-2">{camOn ? <VideoIcon className="h-4 w-4"/> : <VideoOff className="h-4 w-4"/>}{camOn ? "Camera off" : "Camera on"}</Button>
                <Button variant={captionsOn ? "secondary" : "default"} onClick={() => setCaptionsOn(v=>!v)} className="gap-2"><Captions className="h-4 w-4"/>{captionsOn ? "Captions on" : "Captions"}</Button>
                <Button variant={aslOn ? "secondary" : "default"} onClick={() => setAslOn(v=>!v)} className="gap-2"><Hand className="h-4 w-4"/>{aslOn ? "ASL on" : "ASL"}</Button>
                <Button variant="outline" className="gap-2"><ScreenShare className="h-4 w-4"/>Share</Button>
              </div>
            </Card>

            <Card className="p-4 bg-card/60 border border-primary/20">
              <h3 className="font-medium">Participants</h3>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li>You (host)</li>
                <li>Guest • connected</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}