"use client";

import { Card } from "@/components/ui-elements/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui-elements/avatar";

const testimonials = [
  {
    name: "Anna K.",
    role: "Tartalomkészítő",
    avatar: "AK",
    quote: "3 óra helyett most 20 perc az egész heti social media munka. Hihetetlen."
  },
  {
    name: "Péter M.",
    role: "Marketing vezető",
    avatar: "PM",
    quote: "Az AI pontosan a hangunkban ír. Mintha egy profi szövegíró dolgozna a csapatban."
  },
  {
    name: "Laura S.",
    role: "Influencer",
    avatar: "LS",
    quote: "A legjobb időpontok automatikusan beütemezve. Az engagement 247%-kal nőtt!"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground">
            Több mint <span className="text-accent font-bold">1200 alkotó</span> időzít itt naponta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-cyan"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground/90 italic">"{testimonial.quote}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
