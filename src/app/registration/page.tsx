import SignUpFormClient from "@/components/auth-components/signup-form-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-elements/card";
import { Sparkles } from "lucide-react";

export default function RegistrationPage() {
  return (
    <section className="min-h-screen bg-[hsl(var(--background))] relative">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="container mx-auto px-4 py-12 sm:py-20 relative">
        <div className="mx-auto max-w-xl">
          <Card className="bg-[hsl(var(--card))]/90 backdrop-blur-xl border-[hsl(var(--border))] shadow-[0_0_40px_hsla(0,0%,0%,0.25)]">
            <CardHeader className="text-center space-y-4">
              <div
                className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center glow-green"
                style={{ background: "linear-gradient(135deg,hsl(var(--primary)) 0%,hsl(var(--accent)) 60%,hsl(var(--secondary)) 100%)" }}
              >
                <Sparkles className="w-6 h-6 text-[hsl(var(--background))]" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl font-bold leading-tight">
                Kezdd el ingyen —{" "}
                <span className="bg-[linear-gradient(90deg,hsl(var(--primary)),hsl(var(--secondary)))] bg-clip-text text-transparent">
                  7 nap próba, bankkártya nélkül
                </span>
              </CardTitle>
              <CardDescription className="text-[hsl(var(--muted-foreground))]">
                Automatizált WhatsApp és Viber üzenetkezelés, a márkád hangján.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <SignUpFormClient />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
