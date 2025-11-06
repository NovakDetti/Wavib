"use client";

import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui-elements/card";
import { Badge } from "@/components/ui-elements/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui-elements/dialog";
import { Button } from "@/components/ui-elements/button";

import { toast } from "@/hooks/use-toast";
import { PlanCard } from "@/components/dashboard/plan-card";
import { UsageBar } from "@/components/dashboard/usage-bar";
import { getTrial } from "@/components/dashboard/trial";
import { getUsage } from "@/components/dashboard/usage";

export default function BillingPage() {
  const trial = getTrial();
  const usage = getUsage();

  const [selectedPlan, setSelectedPlan] = useState<"Pro" | "Scale" | null>(null);

  const handleChoosePlan = (plan: "Pro" | "Scale") => {
    setSelectedPlan(plan);
  };

  const handleConfirmPlan = () => {
    if (!selectedPlan) return;
    toast({
      title: "Csomag aktiválva",
      description: `A(z) ${selectedPlan} csomag sikeresen aktiválva.`,
    });
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-7xl">
        <PageHeader
          title="Számlázás & Csomagok"
          subtitle="Válaszd ki a neked megfelelő csomagot."
        />

        {trial.isActive && (
          <Card className="mb-8 border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Próbaidőszak aktív</CardTitle>
                  <CardDescription>
                    Fedezd fel az összes funkciót ingyenesen
                  </CardDescription>
                </div>
                <Badge variant="default" className="text-base px-3 py-1">
                  {trial.daysRemaining} nap maradt
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <UsageBar
                value={usage.current}
                max={usage.limit}
                label="Üzenetek ebben az időszakban"
              />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <PlanCard
            name="Trial"
            description="Próbáld ki ingyen 7 napig"
            features={[
              "1000 üzenet / hónap",
              "500 kapcsolat",
              "WhatsApp & Viber",
              "Alapvető analitika",
              "E-mail támogatás",
            ]}
            disabled
            badge="Jelenlegi csomag"
          />

          <PlanCard
            name="Pro"
            price="€29"
            period="hó"
            description="Kis- és közepes vállalkozásoknak"
            features={[
              "10,000 üzenet / hónap",
              "5,000 kapcsolat",
              "WhatsApp & Viber",
              "Részletes analitika",
              "E-mail támogatás",
              "AI üzenetgenerálás",
            ]}
            highlighted
            onAction={() => handleChoosePlan("Pro")}
          />

          <PlanCard
            name="Scale"
            price="€79"
            period="hó"
            description="Nagy forgalmú vállalkozásoknak"
            features={[
              "100,000 üzenet / hónap",
              "50,000 kapcsolat",
              "WhatsApp & Viber & SMS",
              "Haladó analitika",
              "Prioritás támogatás",
              "AI üzenetgenerálás",
              "Egyedi integráció",
              "Dedikált account manager",
            ]}
            onAction={() => handleChoosePlan("Scale")}
          />
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Gyakori kérdések a csomagokról</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="font-medium mb-1">Bármikor módosíthatom a csomagomat?</p>
              <p className="text-muted-foreground">
                Igen, bármikor frissíthetsz vagy visszaléphetsz egy másik csomagra.
                A változás azonnal érvénybe lép.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Mi történik, ha túllépem a limitet?</p>
              <p className="text-muted-foreground">
                Automatikusan értesítést kapsz, és lehetőséged van magasabb csomagra
                váltani vagy extra üzeneteket vásárolni.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Van lemondási díj?</p>
              <p className="text-muted-foreground">
                Nem, bármikor lemondhatod az előfizetésed díjmentesen. Nincs
                szerződéses kötelezettség.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!selectedPlan}
        onOpenChange={(open) => {
          if (!open) setSelectedPlan(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Csomag megerősítése</DialogTitle>
            <DialogDescription>
              Biztosan át szeretnél váltani a(z) {selectedPlan ?? ""} csomagra?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedPlan(null)}>
              Mégse
            </Button>
            <Button onClick={handleConfirmPlan}>Megerősítés</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

