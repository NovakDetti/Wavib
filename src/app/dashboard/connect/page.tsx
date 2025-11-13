"use client";

import { useEffect, useState } from "react";
import { Mail, Link2, Shield, Clock } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui-elements/card";
import { Button } from "@/components/ui-elements/button";
import { toast } from "@/hooks/use-toast";

export default function ConnectPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastConnected, setLastConnected] = useState<string | null>(null);

  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [sending, setSending] = useState(false);

  
  useEffect(() => {
    if (!expiresAt) return;
    const t = setInterval(() => {
      const diff = expiresAt.getTime() - Date.now();
      if (diff <= 0) {
        setMagicLinkSent(false);
        setExpiresAt(null);
        setCountdown("");
        clearInterval(t);
        return;
      }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(t);
  }, [expiresAt]);

  const handleSendMagicLink = async () => {
    try {
      setSending(true);

    
      const email = "novakbernadett94@gmail.com";
      const userId = "demo-user-001";

      const response = await fetch("/api/connect/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userId }),
      });

      console.log(response);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Hiba a magic link küldésekor");
      }

      const expires = new Date(Date.now() + 15 * 60 * 1000);
      setMagicLinkSent(true);
      setExpiresAt(expires);

      toast({
        title: "Magic link elküldve ✅",
        description:
          "Nézd meg az e-mailjeidet és kattints a linkre a WhatsApp Business fiók csatlakoztatásához.",
      });
    } catch (error: any) {
      toast({
        title: "Hiba",
        description: error.message || "Nem sikerült a magic linket elküldeni.",
      });
    } finally {
      setSending(false);
    }
  };

  const handleClick = () => {
    const params = new URLSearchParams({
      client_id: process.env.META_APP_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_WH_CALLBACK_URL!,
      response_type: "code",
      scope: "whatsapp_business_management,whatsapp_business_messaging,business_management",
      config_id: process.env.NEXT_PUBLIC_WH_CONFIG_ID!,
    });
    const url = `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl p-6">
        <PageHeader
          title="Csatorna-kapcsolás"
          subtitle="Kösd össze WhatsApp Business fiókodat biztonságosan."
        />

        <div className="space-y-6">
          {/* WHATSAPP CARD */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#25D366]/10 p-2">
                    <Link2 className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <CardTitle>WhatsApp Business</CardTitle>
                    <CardDescription>Hivatalos API-kapcsolat</CardDescription>
                  </div>
                </div>

                <StatusBadge variant={isConnected ? "success" : "neutral"}>
                  {isConnected ? "Csatlakoztatva" : "Nincs csatlakoztatva"}
                </StatusBadge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {isConnected && lastConnected ? (
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <p className="text-sm text-muted-foreground">
                    Utolsó csatlakozás:{" "}
                    {new Date(lastConnected).toLocaleString("hu-HU")}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    Küldünk egy biztonságos linket az e-mail címedre. Kattints
                    rá, és néhány másodperc alatt összekötheted a WhatsApp
                    Business fiókodat.
                  </p>

              <Button onClick={handleClick} className="btn btn-primary">
                Csatlakoztatom a WhatsApp Business számom
              </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* visszaszámlálás blokk */}
          {magicLinkSent && expiresAt && (
            <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Magic link elküldve</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  Nézd meg az e-mailjeidet és kattints a linkre a csatlakozás
                  befejezéséhez.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>A link lejár:</span>
                  <span className="font-mono font-medium text-primary">
                    {countdown}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Biztonság blokk */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Biztonság</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>✓ OAuth 2.0 autentikáció</p>
              <p>✓ Titkosított adatátvitel</p>
              <p>✓ Bármikor visszavonható hozzáférés</p>
              <p>✓ GDPR-kompatibilis adatkezelés</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
