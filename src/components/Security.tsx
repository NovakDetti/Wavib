"use client";

import { Card } from "@/components/ui-elements/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui-elements/accordion";
import { Badge } from "@/components/ui-elements/badge";
import { Shield, Lock, Key } from "lucide-react";

export const Security = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Biztonság &{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              adatvédelem
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Az adataid a miénk. Vagyis a tieid. Mindig.
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm border-accent text-accent">
            <Shield className="w-4 h-4 mr-2" />
            GDPR Ready
          </Badge>
          <Badge variant="outline" className="px-4 py-2 text-sm border-primary text-primary">
            <Lock className="w-4 h-4 mr-2" />
            OAuth 2.0 Secure
          </Badge>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-primary" />
                  <span>OAuth hitelesítés</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Nem kérjük a jelszavaidat. OAuth 2.0 protokollt használunk, ami azt jelenti, 
                hogy közvetlenül az Instagram, Facebook, stb. official API-ján keresztül 
                kapcsolódsz. Soha nem látjuk a hozzáférési adataidat.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Adatok tárolása és felhasználása</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Az összes adat titkosítva van (AES-256), és kizárólag EU-s szervereken tárolódik. 
                Soha nem adjuk el harmadik félnek. Az AI elemzéshez használt adatok is 
                teljes mértékben anonimizáltak és csak statisztikai célokra szolgálnak.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-secondary" />
                  <span>Hozzáférés visszavonása</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Bármikor visszavonhatod a hozzáférést egyetlen kattintással. 
                Amikor ezt megteszed, azonnal törlünk minden social media adatot és OAuth tokent. 
                A fiókod és az általad manuálisan létrehozott tartalmak megmaradnak, 
                de minden platform-kapcsolat megszűnik.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>GDPR & adatvédelmi jogok</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Teljes mértékben GDPR kompatibilisek vagyunk. Bármikor kérheted az adataid 
                exportálását, módosítását vagy törlését. Az adatkezelési szabályzatunkat 
                átláthatóan közöljük, és minden változásról e-mailben értesítünk.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </section>
  );
};
