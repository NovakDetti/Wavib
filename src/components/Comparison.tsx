"use client";

import { Card } from "@/components/ui-elements/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui-elements/table";
import { CheckCircle2, XCircle } from "lucide-react";

const comparisonData = [
  { feature: "AI-válaszírás (márkahang)", manual: false, otherTools: true,  convopilot: true },
  { feature: "WhatsApp integráció",       manual: false, otherTools: true,  convopilot: true },
  { feature: "Viber integráció",           manual: false, otherTools: false, convopilot: true },
  { feature: "Okos ütemezés",              manual: false, otherTools: true,  convopilot: true },
  { feature: "Auto follow-up",             manual: false, otherTools: false, convopilot: true },
  { feature: "Tudásbázis / FAQ válaszok",  manual: false, otherTools: true,  convopilot: true },
  { feature: "Bejövő láda egy helyen",     manual: false, otherTools: true,  convopilot: true },
  { feature: "Részletes analitika",        manual: false, otherTools: true,  convopilot: true },
  { feature: "Csapat együttműködés",       manual: false, otherTools: true,  convopilot: true },
  { feature: "Magyar nyelvű AI",           manual: false, otherTools: false, convopilot: true },
];

export const Comparison = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Miért{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ConvoPilot.ai?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AI-vezérelt üzenetkezelés + ütemezés + analitika. Egy platformon.
          </p>
        </div>

        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[42%]">Funkció</TableHead>
                <TableHead className="text-center">Kézi munka</TableHead>
                <TableHead className="text-center">Más eszközök</TableHead>
                <TableHead className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
                  ConvoPilot.ai
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {comparisonData.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{row.feature}</TableCell>

                  <TableCell className="text-center">
                    {row.manual ? (
                      <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {row.otherTools ? (
                      <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>

                  <TableCell className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
                    {row.convopilot ? (
                      <CheckCircle2 className="w-5 h-5 mx-auto text-primary" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-4">
          * A táblázat példát mutat a funkciók elérhetőségére. A részletek a csomagoktól függően változhatnak.
        </p>
      </div>
    </section>
  );
};
