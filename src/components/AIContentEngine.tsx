"use client";

import { Card } from "@/components/ui-elements/card";
import { Textarea } from "@/components/ui-elements/textarea";
import { Button } from "@/components/ui-elements/button";
import { Switch } from "@/components/ui-elements/switch";
import { Label } from "@/components/ui-elements/label";
import { Badge } from "@/components/ui-elements/badge";
import { Sparkles } from "lucide-react";

const generatedMessages = [
  {
    text:
      "🕘 Időpont-emlékeztető: holnap 10:30-kor várunk. Ha módosítanád, válaszolj: MÓDOSÍTÁS. Köszönjük!",
    hashtags: "#WhatsApp #Viber #Emlékeztető",
  },
  {
    text:
      "🎉 Akció a héten: minden szolgáltatás –15%. Időpontfoglaláshoz válaszolj egy 'igen'-nel, és küldjük a szabad időpontokat.",
    hashtags: "#Promo #WhatsApp #Viber",
  },
  {
    text:
      "✅ Követő üzenet: láttuk, hogy érdeklődtél. Segíthetünk időpontot foglalni vagy további infót küldeni?",
    hashtags: "#FollowUp #Ügyféltámogatás #WhatsApp #Viber",
  },
];

export const AIContentEngine = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" id="ai-engine">
      <div className="container mx-auto max-w-6xl">
        {/* Fejléc */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            AI{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              üzenetmotor
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Egy bemenet, három üzenetváltozat – a márkád hangján, WhatsAppra és Viberre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Beviteli panel */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl">
            <div className="space-y-5">
              <div>
                <Label htmlFor="topic">Téma vagy cél</Label>
                <Textarea
                  id="topic"
                  placeholder="Pl.: időpont-emlékeztető, promóció, követő üzenet, új szolgáltatás…"
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="tone">Hangvétel</Label>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Tegező</span>
                  <Switch id="tone" />
                  <span className="text-sm text-muted-foreground">Magázó</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan">
                <Sparkles className="w-4 h-4 mr-2" />
                Üzenetek generálása
              </Button>
            </div>
          </Card>

          {/* Generált üzenetek */}
          <div className="space-y-4">
            {generatedMessages.map((item, idx) => (
              <Card
                key={idx}
                className="p-5 bg-muted/30 border-border/50 hover:border-accent/50 rounded-2xl transition-all duration-300"
              >
                <p className="text-sm text-foreground mb-3">{item.text}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.hashtags.split(" ").map((tag, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className={
                        tag.includes("#WhatsApp")
                          ? "bg-primary/20 text-primary border-0"
                          : tag.includes("#Viber")
                          ? "bg-secondary/20 text-secondary border-0"
                          : "bg-accent/20 text-accent border-0"
                      }
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Használom ezt
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
