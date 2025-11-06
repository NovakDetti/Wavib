"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-elements/card";
import { Label } from "@/components/ui-elements/label";
import { Input } from "@/components/ui-elements/input";
import { Button } from "@/components/ui-elements/button";
import { Badge } from "@/components/ui-elements/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui-elements/dialog";
import { Separator } from "@/components/ui-elements/separator";
import { Loader2, Download, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Ha van NextAuth: import { useSession } from "next-auth/react";

type ProfileData = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  timezone: string;
  locale: string;
};

export default function ProfilePage() {
  const { toast } = useToast();
  // const { data: session } = useSession();

  // Demo/mock – cseréld le session userre vagy fetch-re
  const [profile, setProfile] = useState<ProfileData>({
    id: "user_123456",
    name: "Kiss Júlia",
    email: "julia@example.com",
    createdAt: "2024-03-12T10:12:00.000Z",
    timezone: "Europe/Budapest",
    locale: "hu-HU",
  });

  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: valós PATCH /api/profile hívás
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast({ title: "Profil mentve", description: "A változtatások elmentve." });
  };

  const handleExport = async () => {
    // 2 opció:
    // (A) client-side JSON letöltés (mock)
    const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const today = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `userdata-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);

    // (B) vagy hívd: await fetch("/api/gdpr/export")
    toast({ title: "Adatletöltés kész", description: "A személyes adataid JSON formátumban letöltődtek." });
  };

  const submitDeletionRequest = async () => {
    if (confirmText.trim().toUpperCase() !== "DELETE") {
      toast({ title: "Megerősítés szükséges", description: "Írd be: DELETE", variant: "destructive" });
      return;
    }
    // Valós kérés:
    // const res = await fetch("/api/gdpr/delete-request", { method: "POST" });
    // if (!res.ok) { ... }
    await new Promise((r) => setTimeout(r, 700));
    setDeleteOpen(false);
    setConfirmText("");
    toast({
      title: "Törlési kérelem rögzítve",
      description: "E-mailben visszaigazoljuk és 30 napon belül teljesítjük.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <PageHeader
          title="Profil & Adatvédelem"
          subtitle="Tekintsd meg adataidat, kérj exportot vagy indíts törlési kérelmet (GDPR)."
          actions={
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Adatletöltés (JSON)
              </Button>
              <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                <ShieldAlert className="h-4 w-4 mr-2" />
                Fiók törlésének kérése
              </Button>
            </div>
          }
        />

    
        <form onSubmit={handleSave} className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Személyes adatok</CardTitle>
              <CardDescription>Az itt látható adataidat bármikor módosíthatod.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Felhasználó azonosító</Label>
                <Input value={profile.id} readOnly className="opacity-80" />
              </div>
              <div className="space-y-2">
                <Label>Regisztráció</Label>
                <Input value={new Date(profile.createdAt).toLocaleString("hu-HU")} readOnly className="opacity-80" />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label>Név</Label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Időzóna</Label>
                <Input
                  value={profile.timezone}
                  onChange={(e) => setProfile((p) => ({ ...p, timezone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Nyelv</Label>
                <Input
                  value={profile.locale}
                  onChange={(e) => setProfile((p) => ({ ...p, locale: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Mentés
            </Button>
          </div>
        </form>

        {/* Jogok összefoglalása */}
        <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Adatvédelmi jogaid</CardTitle>
            <CardDescription>Rövid összefoglaló a GDPR-ban biztosított jogaidról.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Hozzáférés a rólad kezelt adatokhoz (adatletöltés).
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Helyesbítés (profiladatok frissítése).
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Törlés kérése (elfelejtés joga) – eseti törvényes kötelezettségek mellett.
            </div>
            <Separator className="my-2" />
            <div className="text-xs">
            A törlési kérelmeket tipikusan{" "}
            <Badge variant="secondary">30 napon belül</Badge>{" "}
            teljesítjük.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Törlési kérelem megerősítő dialógus */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fiók törlésének kérése</DialogTitle>
            <DialogDescription>
              A törlés **visszavonhatatlan**. Az adataidat a jogszabályi kötelezettségek figyelembevételével véglegesen
              eltávolítjuk. A folytatáshoz írd be: <span className="font-mono">DELETE</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="confirm">Megerősítés</Label>
            <Input
              id="confirm"
              placeholder="Írd be: DELETE"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Mégse
            </Button>
            <Button variant="destructive" onClick={submitDeletionRequest}>
              Fiók törlésének kérése
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
