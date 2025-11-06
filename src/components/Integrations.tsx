"use client";

import { Card } from "@/components/ui-elements/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui-elements/tooltip";
import { MessageCircle, MessageSquare } from "lucide-react";

const platforms = [
  { name: "WhatsApp", icon: MessageCircle, color: "text-[#25D366]" },
  { name: "Viber", icon: MessageSquare, color: "text-[#7360F2]" },
];

export const Integrations = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      <div className="container mx-auto relative z-10">
        {/* Cím + leírás */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Kapcsolódj,{" "}
            <span className="bg-gradient-to-r from-[#25D366] to-[#7360F2] bg-clip-text text-transparent">
              ahol az ügyfeleid vannak.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            WhatsApp és Viber integráció – automatikus válaszok, ütemezett üzenetek és egységes kezelőfelület.
          </p>
        </div>

        {/* Integráció ikonok */}
        <TooltipProvider>
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Card
                      className="p-12 bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 
                      transition-all duration-300 hover:shadow-[0_0_25px_rgba(115,96,242,0.3)] 
                      cursor-pointer flex flex-col items-center justify-center gap-4 aspect-square rounded-2xl"
                    >
                      <Icon className={`w-12 h-12 ${platform.color}`} />
                      <span className="text-sm font-medium text-muted-foreground">
                        {platform.name}
                      </span>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{platform.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl glow-cyan transition-all duration-300"
          >
            Fiókok összekapcsolása
          </button>
        </div>
      </div>
    </section>
  );
};
