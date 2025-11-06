"use client";

import { useState } from "react";
import { Card } from "@/components/ui-elements/card";
import { Button } from "@/components/ui-elements/button";
import { Badge } from "@/components/ui-elements/badge";
import { Switch } from "@/components/ui-elements/switch";
import { Label } from "@/components/ui-elements/label";
import { Check } from "lucide-react";

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Kezdés WhatsAppon vagy Viberen",
      features: [
        "50 AI-válasz / hónap",
        "1 csatorna (WhatsApp vagy Viber)",
        "Alap automatizmusok (válaszminták)",
        "Alap analitika",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Growth",
      price: isYearly ? "$290" : "$29",
      period: isYearly ? "/év" : "/hó",
      description: "Növekvő vállalkozásoknak",
      features: [
        "2 000 AI-válasz / hónap",
        "2 csatorna (WhatsApp + Viber)",
        "Okos ütemezés és auto follow-up",
        "Tudásbázis / GYIK válaszok",
        "Részletes analitika és jelentések",
        "Prioritásos support",
      ],
      highlighted: true,
      badge: "Legnépszerűbb",
    },
    {
      name: "Pro",
      price: isYearly ? "$790" : "$79",
      period: isYearly ? "/év" : "/hó",
      description: "Profiknak és ügynökségeknek",
      features: [
        "Korlátlan AI-válasz",
        "Több csapat és workspace",
        "Haladó szabályok és sablonok",
        "API & webhook integráció",
        "Fehér címkés jelentések",
        "Dedikált account manager",
      ],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Egyszerű, átlátható{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              árazás
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Válaszd ki a számodra legmegfelelőbb csomagot. Bármikor válthatsz.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Label
              htmlFor="billing-toggle"
              className={!isYearly ? "font-semibold" : "text-muted-foreground"}
            >
              Havonta
            </Label>
            <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label
              htmlFor="billing-toggle"
              className={isYearly ? "font-semibold" : "text-muted-foreground"}
            >
              Évente <span className="text-accent text-sm">(2 hónap ingyen)</span>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-card/80 to-card/50 border-primary glow-cyan scale-105"
                  : "bg-card/50 border-border/50"
              } backdrop-blur-sm transition-transform hover:scale-105 duration-300 rounded-2xl`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
                  {plan.badge}
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan"
                    : "bg-muted hover:bg-muted/80"
                }`}
                size="lg"
              >
                {plan.price === "Free" ? "Kezdés ingyen" : "Kipróbálom"}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-primary" : "text-accent"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
