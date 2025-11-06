"use client";

import { Card } from "@/components/ui-elements/card";
import { Button } from "@/components/ui-elements/button";
import { Play, Sparkles } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <Card className="p-12 bg-card/70 backdrop-blur-lg border-primary/30 glow-cyan text-center rounded-2xl">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Ír, válaszol, ütemez.{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Amíg te pihensz.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Automatizáld a WhatsApp- és Viber-válaszaidat mesterséges intelligenciával. 
              Időt spórolsz, ügyfeleid pedig gyorsabb és pontosabb válaszokat kapnak – 
              miközben te a fontosabb dolgokra koncentrálhatsz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 glow-cyan"
            >
              Ingyen kipróbálom
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Nézd meg, hogyan működik
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            ✓ Nincs bankkártya • ✓ 7 napos próbaidőszak • ✓ Bármikor lemondható
          </p>
        </Card>
      </div>
    </section>
  );
};
