"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { Input } from "@/components/ui-elements/input";
import { Label } from "@/components/ui-elements/label";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

export default function LoginPageClient() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setSocialLoading] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);

    setTimeout(() => {
      setSocialLoading(null);
      toast({
        title: "Hamarosan elérhető",
        description: `${provider} bejelentkezés fejlesztés alatt.`,
      });
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "" };

    if (!formData.email) newErrors.email = "Az e-mail cím kötelező";
    else if (!validateEmail(formData.email))
      newErrors.email = "Érvénytelen e-mail formátum";

    if (!formData.password) newErrors.password = "A jelszó kötelező";

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // TODO: ide jön majd a valódi login (NextAuth, magic link, stb.)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sikeres bejelentkezés!",
        description: "Irány a kezelőfelület...",
      });
      router.push("/dashboard");
    }, 1500);
  };

  // *** ITT FONTOS: VISSZA KELL ADNI A JSX-ET ***
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-background overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 bg-gradient-social opacity-40 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(152 72% 52% / 0.3), hsl(266 78% 60% / 0.2), transparent)",
        }}
      />

      {/* Login Card */}
      <div className="w-full max-w-[480px] relative z-10">
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          {/* Logo Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, hsl(152 72% 52%), hsl(266 78% 60%))",
                color: "hsl(240 15% 5%)",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Wavib
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Üdv újra! Jelentkezz be a Wavib fiókodba
            </h1>
            <p className="text-sm text-muted-foreground">
              Folytasd az automatizált üzenetkezelést a márkád hangján.
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="google"
              size="lg"
              className="w-full"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              disabled={!!isSocialLoading}
            >
              {isSocialLoading === "Google" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  {/* ... Google ikon pathjai ... */}
                </svg>
              )}
              Folytatás Google-lel
            </Button>

            <Button
              type="button"
              variant="apple"
              size="lg"
              className="w-full"
              onClick={() => handleSocialLogin("Apple")}
              disabled={!!isSocialLoading}
            >
              {isSocialLoading === "Apple" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  {/* ... Apple ikon pathjai ... */}
                </svg>
              )}
              Folytatás Apple-lel
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground">
                vagy e-maillel
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ... az email/jelszó inputok, hibák, gomb ... */}
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Nincs még fiókod?{" "}
              <Link
                href="/registration"
                className="text-whatsapp hover:underline font-medium"
              >
                Regisztrálj ingyen
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            30 másodperc alatt kész vagy • Bármikor lemondható
          </p>
        </div>
      </div>
    </div>
  );
}
