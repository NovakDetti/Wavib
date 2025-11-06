"use client";

import { Card } from "@/components/ui-elements/card";
import { Badge } from "@/components/ui-elements/badge";
import { Calendar, Clock } from "lucide-react";

/** Ütemezett üzenetek (példa-adat) */
const scheduledMessages = [
  { time: "Holnap 10:00", title: "Időpont-emlékeztető", platform: "WhatsApp", status: "ready" },
  { time: "Holnap 14:30", title: "Akció –15% kupont kísérő üzenet", platform: "Viber", status: "ready" },
  { time: "Szerda 09:00", title: "Követő üzenet – érdeklődésre", platform: "WhatsApp", status: "ready" },
  { time: "Csütörtök 18:00", title: "Záró emlékeztető – promó vége", platform: "Viber", status: "draft" },
];

const heatmapDays = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];
const heatmapHours = Array.from({ length: 24 }, (_, i) => i);

/** Zöld-lila (WhatsApp–Viber) intenzitás */
const getHeatIntensity = (day: number, hour: number) => {
  const peak1 = (day === 1 || day === 4) && hour >= 9 && hour <= 11;  // kedd/péntek délelőtt
  const peak2 = (day === 2 || day === 3) && hour >= 14 && hour <= 16; // szerda/csüt. délután
  const peak3 = day === 0 && hour >= 18 && hour <= 20;                // hétfő este

  if (peak1 || peak2 || peak3) return "bg-secondary/80";     // lila csúcsidő
  if (hour >= 8 && hour <= 20) return "bg-primary/50";       // zöld aktív sáv
  return "bg-muted/30";                                      // inaktív
};

export const SmartScheduler = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Okos{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ütemező
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Az AI javaslatot ad a kiküldési időkre, hogy az üzenetek a legaktívabb időszakokban érkezzenek.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hőtérkép */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Legjobb időpontok hőtérképe
            </h3>

            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="flex gap-1 mb-2">
                  <div className="w-10" />
                  {heatmapDays.map((day, i) => (
                    <div key={i} className="flex-1 text-center text-xs text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {heatmapHours.filter(h => h % 3 === 0).map((hour) => (
                  <div key={hour} className="flex gap-1 mb-1">
                    <div className="w-10 text-xs text-muted-foreground flex items-center">
                      {hour}:00
                    </div>
                    {heatmapDays.map((_, day) => (
                      <div
                        key={day}
                        className={`flex-1 h-6 rounded ${getHeatIntensity(day, hour)} transition-transform duration-200 hover:scale-110`}
                        title={`${hour}:00`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Következő ütemezett üzenetek */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              Következő ütemezett üzenetek
            </h3>

            <div className="space-y-3">
              {scheduledMessages.map((msg, index) => (
                <div
                  key={index}
                  className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground">{msg.title}</h4>
                    <Badge
                      variant={msg.status === "ready" ? "default" : "secondary"}
                      className={`text-[10px] ${msg.status === "ready" ? "" : "bg-secondary/20 text-secondary border-0"}`}
                    >
                      {msg.status === "ready" ? "Kész" : "Vázlat"}
                    </Badge>
                  </div>

                  <div className="flex items-center flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>{msg.time}</span>
                    <span>•</span>
                    <span className={msg.platform === "WhatsApp" ? "text-primary" : "text-secondary"}>
                      {msg.platform}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
