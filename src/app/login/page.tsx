"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui-elements/button";
import { Input } from "@/components/ui-elements/input";
import { Label } from "@/components/ui-elements/label";
import { Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

export default function LoginPage() {
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
    // TODO: ide jön majd a valódi social auth (NextAuth/Firebase)
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

    // TODO: ide jön a valódi API hívás
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sikeres bejelentkezés!",
        description: "Irány a kezelőfelület...",
      });
      router.push("/");
    }, 1500);
  };

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
                onClick={() => signIn("google", { callbackUrl: "/" })}
                disabled={!!isSocialLoading}
                >
              {isSocialLoading === "Google" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
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
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                E-mail cím
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="pelda@email.hu"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`bg-background/50 border-border/50 focus:border-whatsapp focus:ring-whatsapp/20 transition-all ${
                  errors.email
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : ""
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Jelszó
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-whatsapp hover:underline"
                >
                  Elfelejtetted?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`bg-background/50 border-border/50 focus:border-whatsapp focus:ring-whatsapp/20 transition-all ${
                  errors.password
                    ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                    : ""
                }`}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-whatsapp hover:bg-whatsapp/90 text-background font-semibold glow-whatsapp"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Bejelentkezés...
                </>
              ) : (
                "Bejelentkezés"
              )}
            </Button>
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
