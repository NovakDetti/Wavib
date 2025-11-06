"use client";

import { Card } from "@/components/ui-elements/card";
import { Brain, Wand2, Clock } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Brain,
      title: "① Beállítás",
      description: "Add meg a márkád hangnemét és alapadatait, hogy az AI a stílusodnak megfelelően kommunikáljon.",
      color: "text-accent",
      glowClass: "glow-green",
    },
    {
      icon: Wand2,
      title: "② AI-válasz",
      description: "A rendszer a megadott irányelvek alapján készít természetes, pontos válaszokat.",
      color: "text-secondary",
      glowClass: "glow-purple",
    },
    {
      icon: Clock,
      title: "③ Ütemezés és kiküldés",
      description: "Az AI automatikusan küldi az üzeneteket a legjobb időpontban WhatsAppon és Viberen.",
      color: "text-primary",
      glowClass: "glow-cyan",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Hogyan működik?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Három egyszerű lépésben az AI kezeli a WhatsApp- és Viber-üzeneteidet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className={`bg-card/50 backdrop-blur-sm border-border/50 p-8 hover:scale-105 transition-transform duration-300 ${step.glowClass}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                  index === 0 ? 'from-accent/20 to-accent/5' :
                  index === 1 ? 'from-secondary/20 to-secondary/5' :
                  'from-primary/20 to-primary/5'
                } flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
