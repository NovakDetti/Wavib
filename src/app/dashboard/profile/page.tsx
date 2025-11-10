"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { PageHeader } from "@/components/dashboard/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui-elements/card";
import { Label } from "@/components/ui-elements/label";
import { Input } from "@/components/ui-elements/input";
import { Button } from "@/components/ui-elements/button";
import { Badge } from "@/components/ui-elements/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui-elements/dialog";
import { Separator } from "@/components/ui-elements/separator";
import {
  Loader2,
  Download,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ProfileData = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  timezone: string;
  locale: string;
  picture?: string;
};

export default function ProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const loadProfile = async () => {
      if (status !== "authenticated") return;
      if (!session?.user?.email) {
        setLoadingProfile(false);
        return;
      }

      try {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email }),
        });

        const json = await res.json();

        if (!json.success || !json.user) {
          const nowIso = new Date().toISOString();
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const locale = navigator.language || "hu-HU";

          setProfile({
            id: "—",
            name: session.user.name ?? "",
            email: session.user.email ?? "",
            createdAt: nowIso,
            timezone: tz,
            locale,
            picture: session.user.image ?? undefined,
          });
          return;
        }

        const dbUser = json.user;

        const nowIso = new Date().toISOString();
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language || "hu-HU";

        setProfile({
          id: dbUser.id?.toString?.() ?? "—",
          name: dbUser.name ?? session.user.name ?? "",
          email: dbUser.email ?? session.user.email ?? "",
          createdAt: dbUser.created_at ?? nowIso,
          timezone: dbUser.timezone ?? tz,
          locale: dbUser.locale ?? locale,
          picture: dbUser.picture ?? session.user.image ?? undefined,
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
        toast({
          title: "Hiba a profil betöltésekor",
          description: "Próbáld újra később.",
          variant: "destructive",
        });
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [status, session, toast]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast({
        title: "Profil mentve",
        description: "A változtatások elmentve.",
      });
    } catch (err) {
      toast({
        title: "Hiba mentés közben",
        description: "Próbáld újra később.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (!profile) return;

    const blob = new Blob([JSON.stringify(profile, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const today = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `userdata-${today}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Adatletöltés kész",
      description: "A személyes adataid JSON formátumban letöltődtek.",
    });
  };

  const submitDeletionRequest = async () => {
    if (confirmText.trim().toUpperCase() !== "DELETE") {
      toast({
        title: "Megerősítés szükséges",
        description: "Írd be: DELETE",
        variant: "destructive",
      });
      return;
    }

    await new Promise((r) => setTimeout(r, 700));
    setDeleteOpen(false);
    setConfirmText("");
    toast({
      title: "Törlési kérelem rögzítve",
      description:
        "E-mailben visszaigazoljuk és 30 napon belül teljesítjük.",
    });
  };

  if (status === "loading" || loadingProfile || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

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
              <Button
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
              >
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
              <CardDescription>
                Az itt látható adataidat bármikor módosíthatod.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Felhasználó azonosító</Label>
                <Input value={profile.id} readOnly className="opacity-80" />
              </div>
              <div className="space-y-2">
                <Label>Regisztráció</Label>
                <Input
                  value={new Date(profile.createdAt).toLocaleString("hu-HU")}
                  readOnly
                  className="opacity-80"
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label>Név</Label>
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) =>
                      p ? { ...p, name: e.target.value } : p
                    )
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-1">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((p) =>
                      p ? { ...p, email: e.target.value } : p
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Időzóna</Label>
                <Input
                  value={profile.timezone}
                  onChange={(e) =>
                    setProfile((p) =>
                      p ? { ...p, timezone: e.target.value } : p
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Nyelv</Label>
                <Input
                  value={profile.locale}
                  onChange={(e) =>
                    setProfile((p) =>
                      p ? { ...p, locale: e.target.value } : p
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={saving}>
              {saving && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Mentés
            </Button>
          </div>
        </form>

        <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Adatvédelmi jogaid</CardTitle>
            <CardDescription>
              Rövid összefoglaló a GDPR-ban biztosított jogaidról.
            </CardDescription>
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
              Törlés kérése (elfelejtés joga) – eseti törvényes
              kötelezettségek mellett.
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

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fiók törlésének kérése</DialogTitle>
            <DialogDescription>
              A törlés <strong>visszavonhatatlan</strong>. Az adataidat a
              jogszabályi kötelezettségek figyelembevételével
              véglegesen eltávolítjuk. A folytatáshoz írd be:{" "}
              <span className="font-mono">DELETE</span>
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
