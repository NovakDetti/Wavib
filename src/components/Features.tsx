"use client";

import { Card } from "@/components/ui-elements/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui-elements/tabs";
import { Badge } from "@/components/ui-elements/badge";
import { Input } from "@/components/ui-elements/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, Clock, TrendingUp } from "lucide-react";

const mockData = [
  { name: "H", engagement: 45 },
  { name: "K", engagement: 62 },
  { name: "Sze", engagement: 78 },
  { name: "Cs", engagement: 55 },
  { name: "P", engagement: 89 },
  { name: "Szo", engagement: 94 },
  { name: "V", engagement: 72 },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Fejléc */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Minden, amire az{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              AI-vezérelt üzenetkezeléshez
            </span>{" "}
            szükséged van
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            WhatsApp és Viber automatizáció — professzionális eszközkészlet egyetlen felületen.
          </p>
        </div>

        {/* Tabok */}
        <Tabs defaultValue="ai-writing" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 rounded-xl">
            <TabsTrigger value="ai-writing">AI-írás</TabsTrigger>
            <TabsTrigger value="scheduling">Okos ütemezés</TabsTrigger>
            <TabsTrigger value="analytics">Analitika</TabsTrigger>
          </TabsList>

          {/* AI-írás */}
          <TabsContent value="ai-writing" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">AI-alapú tartalomkészítés</h3>
                  <p className="text-muted-foreground">Üzenetek és posztok a te hangvételeddel.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Téma vagy kulcsszó</label>
                  <Input
                    placeholder="pl. időpont-emlékeztető, akció, új szolgáltatás"
                    className="bg-muted/30 border-border"
                  />
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold tracking-wide">AI</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground mb-2">
                        💡 <strong>Automatikus válaszminta:</strong> „Köszönjük az üzenetet! A legközelebbi
                        szabad időpont <u>holnap 10:30</u>. Megfelel? Válaszolj egy *igen*-nel és rögzítjük.”
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                          #WhatsApp
                        </Badge>
                        <Badge variant="secondary" className="bg-accent/20 text-accent border-0">
                          #Viber
                        </Badge>
                        <Badge variant="secondary" className="bg-secondary/20 text-secondary border-0">
                          #Márkahang
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Ütemezés */}
          <TabsContent value="scheduling" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Okos ütemezés</h3>
                  <p className="text-muted-foreground">Kiküldés a legjobb időpontokban, automatikusan.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { day: "Hétfő", time: "09:00", score: 85 },
                  { day: "Kedd", time: "14:30", score: 92 },
                  { day: "Szerda", time: "11:00", score: 78 },
                  { day: "Csütörtök", time: "16:00", score: 88 },
                  { day: "Péntek", time: "10:30", score: 95 },
                  { day: "Szombat", time: "13:00", score: 90 },
                ].map((slot, i) => (
                  <div key={i} className="bg-muted/30 p-4 rounded-lg border border-border/50">
                    <div className="font-semibold mb-1">{slot.day}</div>
                    <div className="text-2xl font-bold text-primary mb-2">{slot.time}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${slot.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{slot.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analitika */}
          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Részletes analitika</h3>
                  <p className="text-muted-foreground">Üzenetek, kampányok, válaszidő — egy helyen.</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="engagement" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50 text-center">
                  <div className="text-3xl font-bold text-accent mb-1">+247%</div>
                  <div className="text-sm text-muted-foreground">Elköteleződés</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">3,2 mp</div>
                  <div className="text-sm text-muted-foreground">Átlagos válaszidő</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50 text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">92%</div>
                  <div className="text-sm text-muted-foreground">AI-válasz pontosság</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
