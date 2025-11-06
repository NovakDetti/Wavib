"use client";

import { Card } from "@/components/ui-elements/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui-elements/accordion";

const faqs = [
  {
    question: "Az AI tényleg a márkám hangján válaszol?",
    answer:
      "Igen. A rendszerben beállíthatod a hangnemet (tegező/magázó), a stílust és a kulcsinformációkat (árak, nyitvatartás, GYIK). Az AI ezeket következetesen alkalmazza, minden üzenet előtt szerkeszthető."
  },
  {
    question: "Mikor küldi ki az üzeneteket?",
    answer:
      "Az AI a közönség aktivitása alapján ajánl optimális időpontokat, de bármikor felülírhatod: azonnali küldés, manuális ütemezés vagy automatikus közzététel is választható."
  },
  {
    question: "Mely platformokat támogatja?",
    answer:
      "Jelenleg WhatsApp és Viber integráció érhető el egységes felületen. További csatornák (pl. Telegram, Messenger) a fejlesztési ütemtervben szerepelnek."
  },
  {
    question: "Biztonságos a hozzáférés?",
    answer:
      "Igen. Hivatalos API-kapcsolatot használunk, jelszavakat nem tárolunk. A jogosultságok bármikor visszavonhatók a fiókodban. Az adatok továbbítása titkosított, a kezelés megfelel a GDPR-nak."
  },
  {
    question: "Küld a rendszer automatikus követő üzeneteket?",
    answer:
      "Igen. Beállítható szabályok alapján (pl. nincs válasz 24 órán belül) a rendszer udvarias emlékeztetőt küld, a márkád hangján."
  },
  {
    question: "Használhatom csapattal?",
    answer:
      "Igen. A Growth és Pro csomagok több felhasználót, szerepköröket és jóváhagyási folyamatot is támogatnak."
  },
  {
    question: "Hogyan működik a lemondás?",
    answer:
      "Bármikor lemondhatod az előfizetést a fiókodban. A számlázási ciklus végéig aktív marad a hozzáférés, utána automatikusan a Free csomagra váltunk."
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Gyakori{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              kérdések
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">Minden, ami a bevezetéshez fontos.</p>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};
