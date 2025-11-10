"use client";

import { Button } from "@/components/ui-elements/button";
import { Card } from "@/components/ui-elements/card";
import { Play, TrendingUp, Calendar, MessageSquare, Link } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-56 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_60%_at_50%_0%,rgba(143,93,235,0.15),transparent_70%)]" />

      <div className="container mx-auto relative z-10">
        <div className="mt-6 text-center mb-16 animate-slide-up">
          <h1 className="text-6xl sm:text-7xl lg:text-7xl font-bold mb-6 leading-tight">
            Automatizáld az üzeneteid.{" "}
            <span className="bg-gradient-to-r from-[#25D366] via-[#57EBA3] to-[#8F5DEB] bg-clip-text text-transparent">
              Kapcsolódj ügyfeleidhez AI-jal.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A ConvoPilot AI-ja azonnal válaszol, időzít és személyre szabja az üzeneteidet — te pedig
            a növekedésre fókuszálhatsz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registration">
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#1EB85C] text-white font-semibold text-lg px-8 shadow-[0_0_30px_rgba(37,211,102,0.35)]"
              >
                Ingyen kipróbálom
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-[#8F5DEB] text-[#8F5DEB] hover:bg-[#8F5DEB]/10 text-lg px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Demó
            </Button>
          </div>
        </div>
        <div className="mt-24 md:mt-28">
        <div className="max-w-6xl mx-auto scale-[1.05] sm:scale-[1.08] transition-transform duration-700 ease-out">
          <Card className="bg-card/50 backdrop-blur-md border-border/40 p-8 md:p-10 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.25)] glow-purple animate-float">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-muted/40 p-6 rounded-xl border border-border/40">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-[#8F5DEB]" />
                  <span className="text-base font-semibold">Üzenetek feldolgozva</span>
                </div>
                <div className="text-3xl font-bold text-[#8F5DEB]">1 284</div>
                <div className="text-sm text-muted-foreground">ma • WhatsApp + Viber</div>
              </div>

            
              <div className="bg-muted/40 p-6 rounded-xl border border-border/40">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-[#25D366]" />
                  <span className="text-base font-semibold">Ütemezett küldések</span>
                </div>
                <div className="text-3xl font-bold text-[#25D366]">24</div>
                <div className="text-sm text-muted-foreground">következő 7 napban</div>
              </div>

              
              <div className="bg-muted/40 p-6 rounded-xl border border-border/40">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-6 h-6 text-[#8F5DEB]" />
                  <span className="text-base font-semibold">AI által megválaszolt</span>
                </div>
                <div className="text-3xl font-bold text-[#8F5DEB]">156</div>
                <div className="text-sm text-muted-foreground">ebben a hónapban</div>
              </div>
            </div>

            
            <div className="bg-muted/30 p-6 rounded-xl border border-[#25D366]/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#8F5DEB] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-3">
                    AI-generált üzenet • Ütemezve holnap 10:00
                  </div>

                  <p className="text-base text-foreground mb-4">
                    🚀 Új tipp: egy időmenedzsment-hack, ami bizonyítottan növeli a produktivitást...
                    <span className="text-[#25D366]"> #ProductivityTips</span>{" "}
                    <span className="text-[#8F5DEB]">#GrowthMindset #Success</span>
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-[#8F5DEB]/20 text-[#8F5DEB] font-medium">
                      Várhatóan kiemelkedő elérés
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] font-medium">
                      Ideális időpont
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
    </div>
      </div>
    </section>
  );
};
